package com.example.zipplz_be.domain.board.controller;

import com.example.zipplz_be.domain.board.dto.ResponseDTO;
import com.example.zipplz_be.domain.board.service.WorkerListService;
import com.example.zipplz_be.domain.portfolio.dto.PortfolioViewDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/workerlist")
public class WorkerListController {

    private final WorkerListService workerListService;

    public WorkerListController(WorkerListService workerListService) {
        this.workerListService = workerListService;
    }

    @GetMapping("/fields")
    public ResponseEntity<ResponseDTO<List<String>>> getFields() {
        ResponseDTO<List<String>> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            List<String> fields = workerListService.getFields();
            System.out.println(fields);
            if (fields == null) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "세션 결과 없음");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "조회 성공", fields);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }

    @GetMapping("/portfolios")
    public ResponseEntity<ResponseDTO<List<PortfolioViewDTO>>> getWorkList() {
        ResponseDTO<List<PortfolioViewDTO>> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            List<PortfolioViewDTO> workers = workerListService.getWorkLists();
            if (workers == null) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "세션 결과 없음");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "조회 성공", workers);
            }
        } catch(Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }

//    @GetMapping("/portfolios/{field}")
//    public ResponseEntity<ResponseDTO<List<PortfolioViewDTO>>> getWorkListByField() {
//        ResponseDTO<List<PortfolioViewDTO>> responseDTO;
//        HttpStatus status = HttpStatus.ACCEPTED;
//
//        try {
//            List<PortfolioViewDTO> workers = workerListService.getWorkListByField();
//            if (workers == null) {
//                status = HttpStatus.NOT_FOUND;
//                responseDTO = new ResponseDTO<>(status.value(), "세션 결과 없음");
//            } else {
//                status = HttpStatus.OK;
//                responseDTO = new ResponseDTO<>(status.value(), "조회 성공", workers);
//            }
//        } catch(Exception e) {
//            status = HttpStatus.INTERNAL_SERVER_ERROR;
//            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
//        }
//        return new ResponseEntity<>(responseDTO, status);
//    }
}
