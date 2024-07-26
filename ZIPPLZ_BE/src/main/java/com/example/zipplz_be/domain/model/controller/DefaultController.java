package com.example.zipplz_be.domain.model.controller;

import com.example.zipplz_be.domain.model.dto.FieldDTO;
import com.example.zipplz_be.domain.model.dto.GugunDTO;
import com.example.zipplz_be.domain.model.dto.SidoDTO;
import com.example.zipplz_be.domain.model.dto.ResponseDTO;
import com.example.zipplz_be.domain.model.service.DefaultService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/default")
public class DefaultController {

    private final DefaultService defaultService;

    public DefaultController(DefaultService defaultService) {
        this.defaultService = defaultService;
    }

    @GetMapping("/sido")
    public ResponseEntity<ResponseDTO<List<SidoDTO>>> getSidoList() {
        ResponseDTO<List<SidoDTO>> responseDTO;
        HttpStatus status  = HttpStatus.ACCEPTED;
        try {
            List<SidoDTO> sido = defaultService.getSidoList();
            if (sido.size() == 0) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "세션 결과 없음");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "조회 성공", sido);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }

    @GetMapping("/sido/{sido}")
    public ResponseEntity<ResponseDTO<List<GugunDTO>>> getGugunList(@PathVariable("sido") int sido) {
        ResponseDTO<List<GugunDTO>> responseDTO;
        HttpStatus status  = HttpStatus.ACCEPTED;
        try {
            List<GugunDTO> gugun = defaultService.getGugunList(sido);
            if (gugun.size() == 0) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "세션 결과 없음");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "조회 성공", gugun);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }

    @GetMapping("/field")
    public ResponseEntity<ResponseDTO<List<FieldDTO>>> getFieldList() {
        ResponseDTO<List<FieldDTO>> responseDTO;
        HttpStatus status  = HttpStatus.ACCEPTED;

        try {
            List<FieldDTO> field = defaultService.getFieldList();
            if (field.size() == 0) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "세션 결과 없음");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "조회 성공", field);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }
}
