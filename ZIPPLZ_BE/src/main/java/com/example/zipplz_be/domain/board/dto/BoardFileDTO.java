package com.example.zipplz_be.domain.board.dto;

public interface BoardFileDTO {
    int getBoardSerial();
    Integer getFileSerial();
    String getSaveFolder();
    String getOriginalFile();
    String getSaveFile();
    String getFileName();
}
