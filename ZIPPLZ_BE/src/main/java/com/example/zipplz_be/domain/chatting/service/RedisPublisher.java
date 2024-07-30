package com.example.zipplz_be.domain.chatting.service;

import com.example.zipplz_be.domain.chatting.dto.ChatMessageRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RedisPublisher {

    private final RedisTemplate redisTemplate;

    public void publish(ChannelTopic topic, ChatMessageRequestDTO message) {
        redisTemplate.convertAndSend(topic.getTopic(), message);
    }
}
