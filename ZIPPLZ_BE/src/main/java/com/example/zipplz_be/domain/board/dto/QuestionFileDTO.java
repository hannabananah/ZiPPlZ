package com.example.zipplz_be.domain.board.dto;

public interface QuestionFileDTO {
    int getBoardSerial();
    Integer getFileSerial();
    String getSaveFolder();
    String getOriginalFile();
    String getSaveFile();
    String getFileName();
}
