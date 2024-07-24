package com.example.zipplz_be.domain.chatting.repository;

import com.example.zipplz_be.domain.chatting.entity.Chatroom;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ChattingRepository extends JpaRepository<Chatroom, Integer> {
    Chatroom findBychatroomSerial(int chatroomSerial);

    Chatroom findBysessionId(String sessionId);


}
