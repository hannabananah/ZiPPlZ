package com.example.zipplz_be.domain.chatting.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageRequestDTO {
    private int chatroomSerial;
    private String chatMessageContent;
    private int userSerial;
    private String userName;
    private int otherUserSerial;
    private Boolean isFile;
}
