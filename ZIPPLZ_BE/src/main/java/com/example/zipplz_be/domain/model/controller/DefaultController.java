package com.example.zipplz_be.domain.model.controller;

import com.example.zipplz_be.domain.model.dto.FieldDTO;
import com.example.zipplz_be.domain.model.dto.GugunDTO;
import com.example.zipplz_be.domain.model.dto.SidoDTO;
import com.example.zipplz_be.domain.model.dto.ResponseDTO;
import com.example.zipplz_be.domain.model.service.DefaultService;
import com.example.zipplz_be.domain.model.service.S3Service;
import com.example.zipplz_be.domain.model.service.S3ServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/default")
public class DefaultController {

    private final DefaultService defaultService;
    private final S3Service s3Service;

    public DefaultController(DefaultService defaultService, S3Service s3Service) {
        this.defaultService = defaultService;
        this.s3Service = s3Service;
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

    @PostMapping("/upload-image")
    public ResponseEntity<ResponseDTO<List<FieldDTO>>> uploadImage(@RequestPart MultipartFile image) {
        ResponseDTO<List<FieldDTO>> responseDTO;
        HttpStatus status;

        try {
            String url = s3Service.uploadImage(image);
            status = HttpStatus.OK;
            responseDTO = new ResponseDTO<>(status.value(), "이미지 저장 성공");
            System.out.println(url);
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }
}
