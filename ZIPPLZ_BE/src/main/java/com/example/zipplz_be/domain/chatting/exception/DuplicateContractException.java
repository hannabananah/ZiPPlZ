package com.example.zipplz_be.domain.chatting.exception;

public class DuplicateContractException extends RuntimeException{
    public DuplicateContractException(String message) {
        super(message);
    }
}
