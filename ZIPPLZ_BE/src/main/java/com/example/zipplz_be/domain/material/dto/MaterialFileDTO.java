package com.example.zipplz_be.domain.material.dto;

public interface MaterialFileDTO {
    int getMaterialSerial();
    int getFileSerial();
    String getSaveFolder();
    String getOriginalFile();
    String getSaveFile();
    int getUserSerial();
}
