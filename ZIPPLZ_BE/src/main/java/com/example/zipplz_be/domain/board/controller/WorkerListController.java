package com.example.zipplz_be.domain.board.controller;

import com.example.zipplz_be.domain.board.service.WorkerListService;
import com.example.zipplz_be.domain.model.dto.FieldDTO;
import com.example.zipplz_be.domain.model.dto.ResponseDTO;
import com.example.zipplz_be.domain.portfolio.dto.PortfolioViewDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
=======
import org.springframework.web.bind.annotation.*;
>>>>>>> 0565e5dbc386ddf70fe873fd152dd59b1fe3bdd6

import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/workerlist")
public class WorkerListController {

    private final WorkerListService workerListService;

    public WorkerListController(WorkerListService workerListService) {
        this.workerListService = workerListService;
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

    @GetMapping("/portfolios/field/{field_code}")
    public ResponseEntity<ResponseDTO<List<PortfolioViewDTO>>> getWorkListByField(@PathVariable("field_code") int field_code) {
        ResponseDTO<List<PortfolioViewDTO>> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            List<PortfolioViewDTO> workers = workerListService.getWorkListByField(field_code);
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

    @GetMapping("/portfolios/name/{name}")
    public ResponseEntity<ResponseDTO<List<PortfolioViewDTO>>> getWorkListByName(@PathVariable("name") String name) {
        ResponseDTO<List<PortfolioViewDTO>> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            List<PortfolioViewDTO> workers = workerListService.getWorkListByName(name);
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

    @GetMapping("/portfolios/top")
    public ResponseEntity<ResponseDTO<List<PortfolioViewDTO>>> getWorkListTop() {
        ResponseDTO<List<PortfolioViewDTO>> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            List<PortfolioViewDTO> workers = workerListService.getWorkListTop();
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
}
