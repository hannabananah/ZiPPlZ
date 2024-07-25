package com.example.zipplz_be.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;

@Configuration
public class RedisConfig {

    /*
    - 역할: Redis에서 발행된 메시지를 수신하고, 해당 메시지를 구독하는 리스너(Subscriber)에게 전달합니다.
    - 사용: 메시지가 Redis 채널에 발행될 때마다, 이 컨테이너는 메시지를 가져와 설정된 메시지 리스너에게 전달합니다.
     */
    @Bean
    public RedisMessageListenerContainer redisMessageListenerContainer(
            RedisConnectionFactory connectionFactory,
            MessageListenerAdapter listenerAdapter,
            ChannelTopic channelTopic
    ) {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        container.addMessageListener(listenerAdapter, channelTopic);

        return container;
    }

    /*
    - 역할: Redis로부터 메시지를 받고, 실제 메시지 처리 로직이 포함된 Subscriber 클래스의 메서드를 호출합니다.
    - 사용: `MessageListenerAdapter`는 메시지를 수신할 때 `RedisSubscriber` 클래스의 `onMessage` 메서드를 호출합니다.
            이는 실제 메시지 처리를 담당하는 비즈니스 로직을 분리하여 관리할 수 있게 해줍니다
     */
    @Bean
    public MessageListenerAdapter listenerAdapter(RedisSubscriber )
}
