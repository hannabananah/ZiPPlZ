package com.example.zipplz_be.domain.chatting.dto;

import java.sql.Timestamp;

public class ChatroomListDTO {
    private int chatroomSerial;
    private String chatroomName;
    private String lastMessage;

    private Timestamp chatroomDate;
    private int unreadCount;
}
