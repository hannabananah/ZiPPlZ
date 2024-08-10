package com.example.zipplz_be.domain.model.exception;

public class LocalNotFoundException extends RuntimeException{
    public LocalNotFoundException(String message) {
        super(message);
    }
}
