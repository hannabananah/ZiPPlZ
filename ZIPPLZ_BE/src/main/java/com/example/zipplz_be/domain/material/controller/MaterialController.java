package com.example.zipplz_be.domain.material.controller;

import com.example.zipplz_be.domain.material.dto.MaterialViewDTO;
import com.example.zipplz_be.domain.material.serivce.MaterialService;
import com.example.zipplz_be.domain.model.dto.ResponseDTO;
import com.example.zipplz_be.domain.user.dto.CustomUserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/materials")
public class MaterialController {

    private final MaterialService materialService;

    public MaterialController(MaterialService materialService) {
        this.materialService = materialService;
    }

//    @GetMapping("/list")
//    public ResponseEntity<ResponseDTO<List<MaterialViewDTO>>> getMaterialList(Authentication authentication) {
//        ResponseDTO<List<MaterialViewDTO>> responseDTO;
//        HttpStatus status = HttpStatus.ACCEPTED;
//
//        try {
//            List<MaterialViewDTO> materials = materialService.getMaterialList();
//            if (materials == null) {
//                status = HttpStatus.NOT_FOUND;
//                responseDTO = new ResponseDTO<>(status.value(), "세션 결과 없음");
//            } else {
//                status = HttpStatus.OK;
//                responseDTO = new ResponseDTO<>(status.value(), "조회 성공", materials);
//            }
//        } catch(Exception e) {
//            status = HttpStatus.INTERNAL_SERVER_ERROR;
//            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
//        }
//        return new ResponseEntity<>(responseDTO, status);
//    }


    @GetMapping("")
    public ResponseEntity<ResponseDTO<List<MaterialViewDTO>>> getMaterialList(@RequestParam String category) {
        ResponseDTO<List<MaterialViewDTO>> responseDTO;
        HttpStatus status;

        try {
            List<MaterialViewDTO> materials = materialService.getMaterialList(category);
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

    // 변환된 이미지 저장
    @PostMapping("")
    public ResponseEntity<ResponseDTO> saveConvertedImage(Authentication authentication, MultipartFile file) {
        ResponseDTO<List<MaterialViewDTO>> responseDTO;
        HttpStatus status;

        try {
            int userSerial = getUserSerial(authentication);
            materialService.saveConvertedImage(file, userSerial);
            status = HttpStatus.OK;
            responseDTO = new ResponseDTO<>(status.value(), "변환 이미지 저장 성공");
        } catch(Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }

    public int getUserSerial(Authentication authentication) {
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        return customUserDetails.getUserSerial();
    }

    public String getUserRole(Authentication authentication) {
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        return customUserDetails.getRole();
    }

}
