package com.example.zipplz_be.domain.portfolio.exception;

public class PortfolioNotFoundException extends RuntimeException{
    public PortfolioNotFoundException(String message) {
        super(message);
    }
}
