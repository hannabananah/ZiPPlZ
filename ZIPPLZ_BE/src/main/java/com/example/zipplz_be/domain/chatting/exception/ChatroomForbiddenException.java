package com.example.zipplz_be.domain.chatting.exception;

public class ChatroomForbiddenException extends RuntimeException {
    public ChatroomForbiddenException(String message) {
        super(message);
    }
}
