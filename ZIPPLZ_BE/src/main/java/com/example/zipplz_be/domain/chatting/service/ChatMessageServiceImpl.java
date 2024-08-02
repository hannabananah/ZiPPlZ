package com.example.zipplz_be.domain.chatting.service;

import com.example.zipplz_be.domain.chatting.dto.ChatMessageRequestDTO;
import com.example.zipplz_be.domain.chatting.entity.ChatMessage;
import com.example.zipplz_be.domain.chatting.entity.Chatroom;
import com.example.zipplz_be.domain.chatting.exception.ChatroomNotFoundException;
import com.example.zipplz_be.domain.chatting.repository.mongodb.ChatMessageRepository;
import com.example.zipplz_be.domain.chatting.repository.jpa.ChatroomRepository;
import com.example.zipplz_be.domain.user.entity.User;
import com.example.zipplz_be.domain.user.repository.CustomerRepository;
import com.example.zipplz_be.domain.user.repository.UserRepository;
import com.example.zipplz_be.domain.user.repository.WorkerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatMessageServiceImpl implements ChatMessageService {

    private final UserRepository userRepository;
    private final ChatroomRepository chatroomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final RedisPublisher redisPublisher;
    private final ChannelTopic channelTopic;
    private final ChatroomService chatroomService;

    @Override
    public void sendMessage(ChatMessageRequestDTO chatMessageRequestDTO, int userSerial, String role) {
        User user = userRepository.findByUserSerial(userSerial);
        if (user == null) {
            throw new UsernameNotFoundException("해당 유저가 존재하지 않습니다.");
        }
        Chatroom chatroom = chatroomRepository.findByChatroomSerial(chatMessageRequestDTO.getChatroomSerial());
        if (chatroom == null) {
            throw new ChatroomNotFoundException("해당 채팅방이 존재하지 않습니다.");
        }

        ChatMessage chatMessage = ChatMessage.builder()
                .chatroomSerial(chatMessageRequestDTO.getChatroomSerial())
                .userSerial(userSerial)
                .chatMessageContent(chatMessageRequestDTO.getChatMessageContent())
                .build();

        chatMessageRepository.save(chatMessage);

        chatMessageRequestDTO.setUserName(user.getUserName());

        int otherUserSerial;
        if (role.equals("customer")) {
            otherUserSerial = chatroom.getWuser().getUserSerial();
        } else {
            otherUserSerial = chatroom.getCuser().getUserSerial();
        }
        chatMessageRequestDTO.setOtherUserSerial(otherUserSerial);

        redisPublisher.publish(channelTopic, chatMessageRequestDTO);
    }

    @Override
    public void enter(int userSerial, int chatroomSerial) {
        if (!chatroomRepository.existsByChatroomSerial(chatroomSerial)) {
            throw new ChatroomNotFoundException("해당 채팅방이 존재하지 않습니다.");
        }
        Chatroom chatroom = chatroomRepository.findByChatroomSerial(chatroomSerial);

        // 채팅방에 들어온 정보를 Redis에 저장 추가해야 함!
    }

    @Override
    public void saveMessage(ChatMessageRequestDTO chatMessageRequestDTO) {
        System.out.println(chatMessageRequestDTO.toString());
        ChatMessage msg = ChatMessage.builder()
                .chatroomSerial(chatMessageRequestDTO.getChatroomSerial())
                .userSerial(chatMessageRequestDTO.getUserSerial())
                .chatMessageContent(chatMessageRequestDTO.getChatMessageContent()).build();
        ChatMessage result = chatMessageRepository.insert(msg);
        result.toString();
        System.out.println(result);
    }
}
