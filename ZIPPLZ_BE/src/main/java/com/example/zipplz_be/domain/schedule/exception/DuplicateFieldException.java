package com.example.zipplz_be.domain.schedule.exception;

public class DuplicateFieldException extends RuntimeException{
    public DuplicateFieldException(String message) {
        super(message);
    }

}
