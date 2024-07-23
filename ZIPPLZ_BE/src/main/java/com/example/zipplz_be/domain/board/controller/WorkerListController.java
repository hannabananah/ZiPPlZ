package com.example.zipplz_be.domain.board.controller;

import com.example.zipplz_be.domain.board.dto.ResponseDTO;
import com.example.zipplz_be.domain.board.dto.WorkerInfos;
import com.example.zipplz_be.domain.board.service.WorkerListService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.*;

@Controller
@RequestMapping("/workerlist")
public class WorkerListController {

    private final WorkerListService workerListService;

    public WorkerListController(WorkerListService workerListService) {
        this.workerListService = workerListService;
    }

    @GetMapping("/portfolios")
    public ResponseEntity<ResponseDTO> getWorkList() {
        ResponseDTO<String> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        List<WorkerInfos> workers = workerListService.getWorkList();

        try {
            responseDTO = new ResponseDTO<>();
        } catch(Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }
}
