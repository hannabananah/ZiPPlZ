package com.example.zipplz_be.domain.portfolio.exception;

public class UnauthorizedUserException extends RuntimeException{
    public UnauthorizedUserException(String message) {
        super(message);
    }

}
