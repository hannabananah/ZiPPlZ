package com.example.zipplz_be.domain.board.dto;

import java.time.LocalDateTime;

public interface CommentJoinDTO {
    int getCommentSerial();
    int getBoardSerial();
    int getUserSerial();
    String getCommentContent();
    LocalDateTime getCommentDate();
    int getParentCommentSerial();
    int getOrderNumber();
    int getIsDeleted();
}
