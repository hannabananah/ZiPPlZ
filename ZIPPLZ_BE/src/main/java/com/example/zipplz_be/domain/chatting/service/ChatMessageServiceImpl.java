package com.example.zipplz_be.domain.chatting.service;

import com.example.zipplz_be.domain.chatting.dto.ChatMessageRequestDTO;
import com.example.zipplz_be.domain.chatting.entity.ChatMessage;
import com.example.zipplz_be.domain.chatting.entity.Chatroom;
import com.example.zipplz_be.domain.chatting.exception.ChatroomNotFoundException;
import com.example.zipplz_be.domain.chatting.repository.ChatMessageRepository;
import com.example.zipplz_be.domain.chatting.repository.ChatroomRepository;
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
    private final CustomerRepository customerRepository;
    private final WorkerRepository workerRepository;
    private final RedisPublisher redisPublisher;
    private final ChannelTopic channelTopic;

    @Override
    public void sendMessage(ChatMessageRequestDTO chatMessageRequestDTO, int userSerial) {
        User user = userRepository.findByUserSerial(userSerial);
        if (user == null) {
            throw new UsernameNotFoundException("해당 유저가 존재하지 않습니다.");
        }
        Chatroom chatroom = chatroomRepository.findBychatroomSerial(chatMessageRequestDTO.getChatroomSerial());
        if (chatroom == null) {
            throw new ChatroomNotFoundException("해당 채팅방이 존재하지 않습니다.");
        }

        ChatMessage chatMessage = ChatMessage.builder()
                .chatroomSerial(chatroom)
                .userSerial(user)
                .chatMessageContent(chatMessageRequestDTO.getChatMessageContent())
                .build();

//        chatMessageRepository.save(chatMessage); // 아직 MongoDB 연결 안함.

        chatMessageRequestDTO.setUserName(user.getUserName());

        int otherUserSerial;
        if (!customerRepository.existsByUserSerial(user) && !workerRepository.existsByUserSerial(user)) {
            throw new UsernameNotFoundException("해당 유저가 존재하지 않습니다.");
        } else if (customerRepository.existsByUserSerial(user)) {
            otherUserSerial = chatroom.getWorkerSerial().getWorkerSerial();
        } else {
            otherUserSerial = chatroom.getCustomerSerial().getCustomerSerial();
        }
        chatMessageRequestDTO.setOtherUserSerial(otherUserSerial);

        redisPublisher.publish(channelTopic, chatMessageRequestDTO);
    }

    @Override
    public void enter(int userSerial, int chatroomSerial) {
        if (!chatroomRepository.existsByChatroomSerial(chatroomSerial)) {
            throw new ChatroomNotFoundException("해당 채팅방이 존재하지 않습니다.");
        }
        Chatroom chatroom = chatroomRepository.findBychatroomSerial(chatroomSerial);

        // 채팅방에 들어온 정보를 Redis에 저장 추가해야 함!
    }
}
