package com.example.zipplz_be.domain.chatting.repository;

import com.example.zipplz_be.domain.chatting.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Integer> {

}
