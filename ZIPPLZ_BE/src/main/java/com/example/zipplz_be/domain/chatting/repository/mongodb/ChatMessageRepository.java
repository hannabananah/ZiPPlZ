package com.example.zipplz_be.domain.chatting.repository.mongodb;

import com.example.zipplz_be.domain.chatting.entity.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {

}
