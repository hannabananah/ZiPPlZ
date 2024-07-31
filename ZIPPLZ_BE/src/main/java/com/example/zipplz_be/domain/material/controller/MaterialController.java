package com.example.zipplz_be.domain.material.controller;

import com.example.zipplz_be.domain.material.dto.MaterialViewDTO;
import com.example.zipplz_be.domain.material.serivce.MaterialService;
import com.example.zipplz_be.domain.model.dto.ResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/material")
public class MaterialController {

    private final MaterialService materialService;

    public MaterialController(MaterialService materialService) {
        this.materialService = materialService;
    }

    @GetMapping("/list")
    public ResponseEntity<ResponseDTO> getMaterialList() {
        ResponseDTO responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            List<MaterialViewDTO> materials = materialService.getMaterialList();
            if (materials == null) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "세션 결과 없음");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "조회 성공", materials);
            }
        } catch(Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }
}
