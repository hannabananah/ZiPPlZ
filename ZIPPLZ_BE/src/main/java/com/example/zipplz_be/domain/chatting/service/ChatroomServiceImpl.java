package com.example.zipplz_be.domain.chatting.service;

import com.example.zipplz_be.domain.chatting.dto.CreateChatroomDTO;
import com.example.zipplz_be.domain.chatting.entity.Chatroom;
import com.example.zipplz_be.domain.chatting.exception.CannotCreateChatroomAloneException;
import com.example.zipplz_be.domain.chatting.repository.ChatroomRepository;
import com.example.zipplz_be.domain.user.entity.Customer;
import com.example.zipplz_be.domain.user.entity.User;
import com.example.zipplz_be.domain.user.entity.Worker;
import com.example.zipplz_be.domain.user.repository.CustomerRepository;
import com.example.zipplz_be.domain.user.repository.UserRepository;
import com.example.zipplz_be.domain.user.repository.WorkerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

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

        Customer customer = customerRepository.existsByUserSerial(user) ?
                customerRepository.findByUserSerial(user) : customerRepository.findByUserSerial(anotherUser);
        Worker worker = customerRepository.existsByUserSerial(user) ?
                workerRepository.findByUserSerial(anotherUser) : workerRepository.findByUserSerial(user);

        if (chatroomRepository.existsByCustomerSerialAndWorkerSerial(customer, worker)) {
            Chatroom savedChatroom =chatroomRepository.findByCustomerSerialAndWorkerSerial(customer, worker);
            return savedChatroom.getChatroomSerial();
        }

        Chatroom newChatroom = Chatroom.builder()
                .customerSerial(customer)
                .workerSerial(worker).build();
        chatroomRepository.save(newChatroom);

        return newChatroom.getChatroomSerial();
    }
}
