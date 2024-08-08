package com.example.zipplz_be.domain.chatting.entity;

import com.example.zipplz_be.domain.file.entity.File;
import com.example.zipplz_be.domain.model.BaseTimeEntity;
import com.example.zipplz_be.domain.model.entity.MessageType;
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
public class ChatMessage extends BaseTimeEntity implements Comparable<ChatMessage> {

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

    @JsonProperty("file_type")
    private MessageType fileType;

    @JsonProperty("file")
    private File file;

    // 시간은 BaseTimeEntity에서 자동으로 컬럼 생성됨

    @Builder
    public ChatMessage(int chatroomSerial, int userSerial, String userName, String chatMessageContent, MessageType fileType, File file) {
//        MessageType currMsgType;
//        if (fileType.equals(MessageType.IMAGE.toString())) {
//            currMsgType = MessageType.IMAGE;
//        } else if (fileType.equals(MessageType.FILE.toString())) {
//            currMsgType = MessageType.FILE;
//        } else if (fileType.equals(MessageType.TALK.toString())) {
//            currMsgType = MessageType.TALK;
//        } else {
//            currMsgType = MessageType.UNREAD_MESSAGE_COUNT_ALARM;
//        }

        this.chatroomSerial = chatroomSerial;
        this.userSerial = userSerial;
        this.userName = userName;
        this.chatMessageContent = chatMessageContent;
        this.fileType = fileType;
        this.file = file;
    }

    @Override
    public String toString() {
        return "ChatMessage{" +
                "id='" + id + '\'' +
                ", chatroomSerial=" + chatroomSerial +
                ", userSerial=" + userSerial +
                ", userName='" + userName + '\'' +
                ", chatMessageContent='" + chatMessageContent + '\'' +
                ", fileType=" + fileType +
                '}';
    }

    @Override
    public int compareTo(ChatMessage o) {
        return this.getCreatedAt().compareTo(o.getCreatedAt());
    }
}
