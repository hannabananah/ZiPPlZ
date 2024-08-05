package com.example.zipplz_be.domain.chatting.dto;

import com.example.zipplz_be.domain.chatting.entity.ChatMessage;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
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

    public ChatMessageResponseDTO(ChatMessageRequestDTO request) {
        this.userSerial = request.getUserSerial();
        this.userName = request.getUserName();
        this.chatMessageContent = request.getChatMessageContent();
        this.isFile = request.getIsFile();
        this.createdAt = LocalDateTime.now();
    }

    public ChatMessageResponseDTO(ChatMessage chatMessage) {
        this.userSerial = chatMessage.getUserSerial();
        this.userName = chatMessage.getUserName();
        this.chatMessageContent = chatMessage.getChatMessageContent();
        this.createdAt = chatMessage.getCreatedAt();
        this.isFile = chatMessage.isFile();
    }
}
