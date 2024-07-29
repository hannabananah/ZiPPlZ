package com.example.zipplz_be.domain.chatting.exception;

public class ChatroomNotFoundException extends RuntimeException {
    public ChatroomNotFoundException(String message) { super(message); }
}
