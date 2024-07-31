package com.example.zipplz_be.domain.mypage.controller;

import com.example.zipplz_be.domain.model.dto.ResponseDTO;
import com.example.zipplz_be.domain.mypage.service.WishService;
import com.example.zipplz_be.domain.portfolio.dto.PortfolioViewDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/wish")
public class WishController {

    private final WishService wishService;

    public WishController(WishService wishService) {
        this.wishService = wishService;
    }

    @PostMapping("/workerlist")
    public ResponseEntity<ResponseDTO<List<PortfolioViewDTO>>> getWorkerWishList(@RequestBody(required = false) Map<String, Integer> params) {
        ResponseDTO<List<PortfolioViewDTO>> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            int wish_serial = params.get("wish_serial");
            List<PortfolioViewDTO> workers = wishService.getWorkerWishList(1, wish_serial);
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
}
