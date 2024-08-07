package com.example.zipplz_be.domain.board.controller;

import com.example.zipplz_be.domain.board.dto.QuestionDetailDTO;
import com.example.zipplz_be.domain.board.dto.QuestionListDTO;
import com.example.zipplz_be.domain.board.service.BoardService;
import com.example.zipplz_be.domain.model.dto.ResponseDTO;
import com.example.zipplz_be.domain.user.dto.CustomUserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/board")
public class QuestionController {

    private final BoardService boardService;

    public QuestionController(BoardService boardService) {
        this.boardService = boardService;
    }

    // 질문글 추가하기
    @PostMapping("/question/add")
    public ResponseEntity<ResponseDTO<Boolean>> addQuestion(Authentication authentication, @RequestBody(required = false) Map<String, Object> params) {
        ResponseDTO<Boolean> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
            int user_serial = customUserDetails.getUserSerial();
            int board_type = (int) params.get("board_type");
            String title = (String) params.get("title");
            String board_content = (String) params.get("board_content");
            LocalDateTime board_date = LocalDateTime.now();
            int hit = 0;

            int result = boardService.addBoard(user_serial, board_type, title, board_content, board_date, hit);
            if (result == 0) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "삽입 실패 없음");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "삽입 성공", true);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }

    // 전체 질문글 가져오기
    @PostMapping("/question/list")
    public ResponseEntity<ResponseDTO<List<QuestionListDTO>>> getQuestions(@RequestBody(required = false) Map<String, Object> params) {
        ResponseDTO<List<QuestionListDTO>> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            int board_type = (int) params.get("board_type");
            List<QuestionListDTO> questions = boardService.getQuestions(board_type);

            if (questions == null) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "조회 실패 없음");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "조회 성공", questions);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }

    // 질문글 가져오기
    @PostMapping("/question/list/{boardSerial}")
    public ResponseEntity<ResponseDTO<QuestionDetailDTO>> getQuestion(Authentication authentication, @PathVariable(value = "boardSerial") int boardSerial) {
        ResponseDTO<QuestionDetailDTO> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            QuestionDetailDTO question= boardService.getQuestion(boardSerial);

            if (question == null) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "조회 실패 없음");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "조회 성공", question);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }

    // 질문글 수정하기
    @PatchMapping("/question/list/{boardSerial}")
    public ResponseEntity<ResponseDTO<Boolean>> modifyQuestion(Authentication authentication, @PathVariable(value = "boardSerial") int boardSerial, @RequestBody(required = false) Map<String, String> params) {
        ResponseDTO<Boolean> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            String title = params.get("title");
            String board_content = params.get("board_content");
            LocalDateTime board_date = LocalDateTime.now();
            int result= boardService.modifyQuestion(boardSerial, title, board_content, board_date);

            if (result == 0) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "수정 실패 없음");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "수정 성공", true);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }
}
