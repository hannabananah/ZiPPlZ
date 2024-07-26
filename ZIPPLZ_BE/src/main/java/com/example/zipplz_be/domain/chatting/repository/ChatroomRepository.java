package com.example.zipplz_be.domain.chatting.repository;

import com.example.zipplz_be.domain.chatting.entity.Chatroom;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ChatroomRepository extends JpaRepository<Chatroom, Integer> {
    Chatroom findBychatroomSerial(int chatroomSerial);

    Chatroom findBysessionId(String sessionId);

    Boolean existsByChatroomSerial(int chatroomSerial);
}
