package com.example.zipplz_be.domain.board.service;

import com.example.zipplz_be.domain.board.dto.QuestionDetailDTO;
import com.example.zipplz_be.domain.board.dto.QuestionListDTO;

import java.time.LocalDateTime;
import java.util.*;

public interface BoardService {
    int addBoard(int userSerial, int boardType, String title, String boardContent, LocalDateTime boardDate, int hit);
    List<QuestionListDTO> getQuestions(int boardType);
    QuestionDetailDTO getQuestion(int boardSerial);
    int modifyQuestion(int boardSerial, String title, String boardContent, LocalDateTime boardDate);
}
