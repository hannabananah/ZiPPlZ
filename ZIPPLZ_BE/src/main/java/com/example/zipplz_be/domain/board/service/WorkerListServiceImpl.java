package com.example.zipplz_be.domain.board.service;

import com.example.zipplz_be.domain.board.dto.WorkerInfosDTO;
import com.example.zipplz_be.domain.board.repository.WorkerRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class WorkerListServiceImpl implements WorkerListService {

    private final WorkerRepository workerListRepository;

    public WorkerListServiceImpl(WorkerRepository workerListRepository) {
        this.workerListRepository = workerListRepository;
    }

    @Override
    public List<WorkerInfosDTO> getWorkList() {
        List<WorkerInfosDTO> tmp = new ArrayList<>();
        return tmp;
    }
}
