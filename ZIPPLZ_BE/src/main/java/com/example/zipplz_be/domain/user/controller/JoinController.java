package com.example.zipplz_be.domain.user.controller;

import com.example.zipplz_be.domain.model.dto.ResponseDTO;
import com.example.zipplz_be.domain.user.dto.JoinDTO;
import com.example.zipplz_be.domain.user.dto.JoinResponseDTO;
import com.example.zipplz_be.domain.user.service.JoinService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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
    public ResponseEntity<ResponseDTO> joinProcess(@RequestBody JoinDTO joinDTO) {
        ResponseDTO responseDTO;
        HttpStatus status;
        try {
            int userSerial = joinService.joinProcess(joinDTO);
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
}
