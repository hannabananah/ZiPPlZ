package com.example.zipplz_be.domain.mypage.controller;

import com.example.zipplz_be.domain.material.dto.MaterialViewDTO;
import com.example.zipplz_be.domain.model.dto.ResponseDTO;
import com.example.zipplz_be.domain.mypage.service.WishService;
import com.example.zipplz_be.domain.portfolio.dto.PortfolioViewDTO;
import com.example.zipplz_be.domain.user.dto.CustomUserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/wish")
public class WishController {

    private final WishService wishService;

    public WishController(WishService wishService) {
        this.wishService = wishService;
    }

    @PostMapping("/addWish")
    public ResponseEntity<ResponseDTO<Boolean>> addWorker(Authentication authentication, @RequestBody(required = false) Map<String, Integer> params) {
        ResponseDTO<Boolean> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
            int user_serial = customUserDetails.getUserSerial();
            int wish_type = params.get("wish_type");
            int wish_serial = params.get("wish_serial");
            int result = wishService.addWish(user_serial, wish_type, wish_serial);
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

    @PostMapping("/workerlist")
    public ResponseEntity<ResponseDTO<List<PortfolioViewDTO>>> getWorkerWishList(Authentication authentication, @RequestBody(required = false) Map<String, Integer> params) {
        ResponseDTO<List<PortfolioViewDTO>> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
            int user_serial = customUserDetails.getUserSerial();
            int wish_type = 1;
            List<PortfolioViewDTO> workers = wishService.getWorkerWishList(wish_type, user_serial);
            if (workers == null) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "세션 결과 없음");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "조회 성공", workers);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }

//    @PostMapping("/materiallist")
//    public ResponseEntity<ResponseDTO<List<MaterialViewDTO>>> getMaterialWishList(Authentication authentication, @RequestBody(required = false) Map<String, Integer> params) {
//        ResponseDTO<List<MaterialViewDTO>> responseDTO;
//        HttpStatus status = HttpStatus.ACCEPTED;
//
//        try {
//            CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
//            int user_serial = customUserDetails.getUserSerial();
//            int wish_type = 2;
//            List<MaterialViewDTO> materials = wishService.getMaterialWishList(wish_type, user_serial);
//            if (materials == null) {
//                status = HttpStatus.NOT_FOUND;
//                responseDTO = new ResponseDTO<>(status.value(), "세션 결과 없음");
//            } else {
//                status = HttpStatus.OK;
//                responseDTO = new ResponseDTO<>(status.value(), "조회 성공", materials);
//            }
//        } catch (Exception e) {
//            status = HttpStatus.INTERNAL_SERVER_ERROR;
//            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
//        }
//        return new ResponseEntity<>(responseDTO, status);
//    }
}
