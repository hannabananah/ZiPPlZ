package com.example.zipplz_be.domain.Schedule.exception;

public class DuplicateFieldException extends RuntimeException{
    public DuplicateFieldException(String message) {
        super(message);
    }

}
