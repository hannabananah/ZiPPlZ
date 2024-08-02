package com.example.zipplz_be.domain.user.controller;

import com.example.zipplz_be.domain.model.dto.ResponseDTO;
import com.example.zipplz_be.domain.user.dto.InsertCustomerDTO;
import com.example.zipplz_be.domain.user.dto.InsertWorkerDTO;
import com.example.zipplz_be.domain.user.dto.JoinRequestDTO;
import com.example.zipplz_be.domain.user.dto.JoinResponseDTO;
import com.example.zipplz_be.domain.user.service.JoinService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class JoinController {

    private final JoinService joinService;
    public JoinController(JoinService joinService) {
        this.joinService = joinService;
    }

    @PostMapping("/join")
    public ResponseEntity<ResponseDTO> joinProcess(@RequestBody JoinRequestDTO joinRequestDTO) {
        ResponseDTO responseDTO;
        HttpStatus status;
        try {
            int userSerial = joinService.joinProcess(joinRequestDTO);
            if (userSerial == -1) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "유저 회원가입 실패.");
            } else {
                status = HttpStatus.OK;
                JoinResponseDTO joinResponseDTO = new JoinResponseDTO(userSerial);
                responseDTO = new ResponseDTO<>(status.value(), "유저 회원가입 성공", joinResponseDTO);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }

    @PostMapping("/join/customer")
    public ResponseEntity<ResponseDTO> insertCustomerInfo(@RequestBody InsertCustomerDTO insertCustomerDTO) {
        ResponseDTO responseDTO;
        HttpStatus status;
        try {
            boolean result = joinService.insertCustomerInfo(insertCustomerDTO);
            if (!result) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "해당 유저를 찾을 수 없습니다.");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "고객 세부사항 입력 성공");
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }

    @PostMapping("/join/worker")
    public ResponseEntity<ResponseDTO> insertWorkerInfo(@RequestBody InsertWorkerDTO insertWorkerDTO) {
        ResponseDTO responseDTO;
        HttpStatus status;
        try {
            boolean result = joinService.insertWorkerInfo(insertWorkerDTO);
            if (!result) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "해당 유저를 찾을 수 없습니다.");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "시공자 세부사항 입력 성공");
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }


}
