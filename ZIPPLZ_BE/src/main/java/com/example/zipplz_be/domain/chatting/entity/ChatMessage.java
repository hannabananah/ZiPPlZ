package com.example.zipplz_be.domain.chatting.entity;

import com.example.zipplz_be.domain.model.BaseTimeEntity;
import com.example.zipplz_be.domain.user.entity.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(collection = "chat_messages")
public class ChatMessage extends BaseTimeEntity {

    @Id
    private String id;

    @JsonProperty("chatroom_serial")
    private int chatroomSerial;

    @JsonProperty("user_serial")
    private int userSerial;

    @JsonProperty("user_name")
    private String userName;

    @JsonProperty("chat_message_content")
    private String chatMessageContent;

    @JsonProperty("is_file")
    private boolean isFile;

    // 시간은 BaseTimeEntity에서 자동으로 컬럼 생성됨

    @Builder
    public ChatMessage(int chatroomSerial, int userSerial, String userName, String chatMessageContent, boolean isFile) {
        this.chatroomSerial = chatroomSerial;
        this.userSerial = userSerial;
        this.userName = userName;
        this.chatMessageContent = chatMessageContent;
        this.isFile = isFile;
    }

    @Override
    public String toString() {
        return "ChatMessage{" +
                "id='" + id + '\'' +
                ", chatroomSerial=" + chatroomSerial +
                ", userSerial=" + userSerial +
                ", userName='" + userName + '\'' +
                ", chatMessageContent='" + chatMessageContent + '\'' +
                ", isFile=" + isFile +
                '}';
    }
}
