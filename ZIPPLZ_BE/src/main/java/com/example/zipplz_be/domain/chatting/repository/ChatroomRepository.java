package com.example.zipplz_be.domain.chatting.repository;

import com.example.zipplz_be.domain.chatting.entity.Chatroom;
import com.example.zipplz_be.domain.user.entity.Customer;
import com.example.zipplz_be.domain.user.entity.Worker;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ChatroomRepository extends JpaRepository<Chatroom, Integer> {
    Chatroom findBychatroomSerial(int chatroomSerial);

    Chatroom findBysessionId(String sessionId);

    Boolean existsByChatroomSerial(int chatroomSerial);

    Boolean existsByCustomerSerialAndWorkerSerial(Customer customerSerial, Worker workerSerial);

    Chatroom findByCustomerSerialAndWorkerSerial(Customer customerSerial, Worker workerSerial);
}
