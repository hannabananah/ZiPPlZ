package com.example.zipplz_be.domain.chatting.exception;

public class ContractNotFoundException extends RuntimeException{
    public ContractNotFoundException(String message) {
        super(message);
    }
}
