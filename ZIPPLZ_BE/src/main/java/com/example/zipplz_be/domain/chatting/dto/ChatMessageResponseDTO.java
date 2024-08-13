package com.example.zipplz_be.domain.chatting.dto;

import com.example.zipplz_be.domain.chatting.entity.ChatMessage;
import com.example.zipplz_be.domain.file.entity.File;
import com.example.zipplz_be.domain.model.entity.MessageType;
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
    private MessageType fileType;
    private File file;

    public ChatMessageResponseDTO(ChatMessageRequestDTO request) {
        this.userSerial = request.getUserSerial();
        this.userName = request.getUserName();
        this.chatMessageContent = request.getChatMessageContent();
        this.fileType = request.getType();
        this.createdAt = LocalDateTime.now().plusHours(12);;
        this.file = null;
    }

    public ChatMessageResponseDTO(ChatMessage chatMessage) {
        this.userSerial = chatMessage.getUserSerial();
        this.userName = chatMessage.getUserName();
        this.chatMessageContent = chatMessage.getChatMessageContent();
        this.createdAt = chatMessage.getCreatedAt().plusHours(12);;
        this.fileType = chatMessage.getFileType();
        this.file = chatMessage.getFile();
    }
}
