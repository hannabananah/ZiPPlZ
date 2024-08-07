package com.example.zipplz_be.domain.chatting.dto;

import com.example.zipplz_be.domain.chatting.entity.ChatMessage;
import com.example.zipplz_be.domain.file.entity.File;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageResponseDTO {
    private int userSerial;
    private String userName;
    private String chatMessageContent;
    @JsonFormat(pattern = "yyyy-MM-dd hh:mm", timezone = "Asia/Seoul")
    private LocalDateTime createdAt;
    private Boolean isFile;
    private File file;

    public ChatMessageResponseDTO(ChatMessageRequestDTO request) {
        this.userSerial = request.getUserSerial();
        this.userName = request.getUserName();
        this.chatMessageContent = request.getChatMessageContent();
        this.isFile = request.getIsFile();
        this.createdAt = LocalDateTime.now();
        this.file = null;
    }

    public ChatMessageResponseDTO(ChatMessage chatMessage) {
        this.userSerial = chatMessage.getUserSerial();
        this.userName = chatMessage.getUserName();
        this.chatMessageContent = chatMessage.getChatMessageContent();
        this.createdAt = chatMessage.getCreatedAt();
        this.isFile = chatMessage.isFile();
        this.file = null;
    }

    public ChatMessageResponseDTO(ChatMessage chatMessage, File file) {
        this.userSerial = chatMessage.getUserSerial();
        this.userName = chatMessage.getUserName();
        this.chatMessageContent = chatMessage.getChatMessageContent();
        this.createdAt = chatMessage.getCreatedAt();
        this.isFile = chatMessage.isFile();
        this.file = file;
    }
}
