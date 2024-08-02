package com.example.zipplz_be.domain.chatting.service;

import com.example.zipplz_be.domain.chatting.dto.CreateChatroomDTO;
import com.example.zipplz_be.domain.chatting.entity.Chatroom;
import com.example.zipplz_be.domain.chatting.exception.CannotCreateChatroomAloneException;
import com.example.zipplz_be.domain.chatting.repository.jpa.ChatroomRepository;
import com.example.zipplz_be.domain.user.entity.User;
import com.example.zipplz_be.domain.user.repository.CustomerRepository;
import com.example.zipplz_be.domain.user.repository.UserRepository;
import com.example.zipplz_be.domain.user.repository.WorkerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatroomServiceImpl implements ChatroomService {

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final WorkerRepository workerRepository;
    private final ChatroomRepository chatroomRepository;

    @Override
    public int createChatroom(int userSerial, CreateChatroomDTO createChatroomDTO) {

        if (createChatroomDTO.getAnotherUserSerial() == userSerial) {
            throw new CannotCreateChatroomAloneException("자기 자신과의 채팅방은 생성할 수 없습니다.");
        }
        if (!userRepository.existsByUserSerial(userSerial) || !userRepository.existsByUserSerial(createChatroomDTO.getAnotherUserSerial())) {
            throw new UsernameNotFoundException("해당 유저가 존재하지 않습니다.");
        }

        User user = userRepository.findByUserSerial(userSerial);
        User anotherUser = userRepository.findByUserSerial(createChatroomDTO.getAnotherUserSerial());

        User cUser = customerRepository.existsByUserSerial(user) ? user : anotherUser;
        User wUser = customerRepository.existsByUserSerial(user) ? anotherUser : user;

        if (chatroomRepository.existsByCuserAndWuser(cUser, wUser)) {
            Chatroom savedChatroom =chatroomRepository.findByCuserAndWuser(cUser, wUser);
            return savedChatroom.getChatroomSerial();
        }

        Chatroom newChatroom = Chatroom.builder()
                .cuser(cUser)
                .wuser(wUser).build();
        chatroomRepository.save(newChatroom);

        return newChatroom.getChatroomSerial();
    }

//    @Override
//    public List<Chatroom> getChatroomList(int userSerial, String role, Pageable pageable) {
//        User user = userRepository.findByUserSerial(userSerial);
//        if (role.equals("customer")) {
//            return chatroomRepository
//                    .findAllByCUserSerial(user);
//        } else {
//            return chatroomRepository
//                    .findAllByWUserSerial(user);
//        }
//    }
}
