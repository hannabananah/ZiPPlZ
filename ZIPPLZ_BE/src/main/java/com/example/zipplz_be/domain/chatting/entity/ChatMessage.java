package com.example.zipplz_be.domain.chatting.entity;

import com.example.zipplz_be.domain.model.BaseTimeEntity;
import com.example.zipplz_be.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document
public class ChatMessage extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_message_serial")
    private int chatMessageSerial;

    @ManyToOne
    @JoinColumn(name = "chatroom_serial")
    private Chatroom chatroomSerial;

    @ManyToOne
    @JoinColumn(name = "user_serial")
    private User userSerial;

    @Column(name = "chat_message_content")
    private String chatMessageContent;

    // 시간은 BaseTimeEntity에서 자동으로 컬럼 생성됨

    @Builder
    public ChatMessage(Chatroom chatroomSerial, User userSerial, String chatMessageContent) {
        this.chatroomSerial = chatroomSerial;
        this.userSerial = userSerial;
        this.chatMessageContent = chatMessageContent;
    }
}
