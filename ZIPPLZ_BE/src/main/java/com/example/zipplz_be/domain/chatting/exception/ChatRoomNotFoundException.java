package com.example.zipplz_be.domain.chatting.exception;

public class ChatRoomNotFoundException extends RuntimeException {
    public ChatRoomNotFoundException(String message) { super(message); }
}
