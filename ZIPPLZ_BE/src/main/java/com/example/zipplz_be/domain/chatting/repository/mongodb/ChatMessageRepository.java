package com.example.zipplz_be.domain.chatting.repository.mongodb;

import com.example.zipplz_be.domain.chatting.entity.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {

    List<ChatMessage> findAllByChatroomSerialOrderByCreatedAtDesc(int chatroomSerial);

    Optional<ChatMessage> findFirstByChatroomSerialOrderByCreatedAtDesc(int chatroomSerial);
}
