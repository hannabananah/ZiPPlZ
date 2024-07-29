package com.example.zipplz_be.domain.portfolio.dto;

public interface PortfolioFileDTO {
    int getPortfolioSerial();
    int getFileSerial();
    String getSaveFolder();
    String getOriginalFile();
    String getSaveFile();
    int getUserSerial();
}
