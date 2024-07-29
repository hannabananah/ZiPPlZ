package com.example.zipplz_be.domain.chatting.service;

import com.example.zipplz_be.domain.chatting.dto.ChatMessageRequestDTO;
import com.example.zipplz_be.domain.chatting.dto.ChatMessageResponseDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisSubscriber implements MessageListener {

    private final ObjectMapper objectMapper;
    private final RedisTemplate redisTemplate;
    private final SimpMessageSendingOperations messagingTemplate;

    /*
    Redis에서 메세지가 발행(publish)되면 대기하고 있던 onMessage가 해당 메세지를 받아 처리
     */
    @Override
    public void onMessage(Message message, byte[] pattern) {
       try {
           // redis에서 발행된 데이터를 받아 역직렬화
           String publishMessage = (String) redisTemplate.getStringSerializer().deserialize(message.getBody());

           // ChatMessage 객체로 맵핑
           ChatMessageRequestDTO roomMessage = objectMapper.readValue(publishMessage, ChatMessageRequestDTO.class);

           ChatMessageResponseDTO chatMessageResponseDTO = new ChatMessageResponseDTO(roomMessage);
           messagingTemplate.convertAndSend("/sub/chat/room/" + roomMessage.getChatroomSerial(), chatMessageResponseDTO);
       } catch (Exception e) {

        }
    }
}
