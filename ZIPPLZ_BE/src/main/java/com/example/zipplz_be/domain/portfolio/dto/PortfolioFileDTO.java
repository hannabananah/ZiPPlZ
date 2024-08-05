package com.example.zipplz_be.domain.portfolio.dto;

public interface PortfolioFileDTO {
    int getPortfolioSerial();
    Integer getFileSerial();
    String getSaveFolder();
    String getOriginalFile();
    String getSaveFile();
    Integer getUserSerial();
}
