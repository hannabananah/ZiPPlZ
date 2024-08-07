package com.example.zipplz_be.domain.schedule.exception;

public class WorkerNotFoundException extends RuntimeException{
    public WorkerNotFoundException(String message) {
        super(message);
    }

}
