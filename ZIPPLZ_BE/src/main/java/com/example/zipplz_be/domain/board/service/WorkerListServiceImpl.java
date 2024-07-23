package com.example.zipplz_be.domain.board.service;

import com.example.zipplz_be.domain.board.dto.WorkerInfos;
import com.example.zipplz_be.domain.board.repository.WorkerListRepository;

import java.util.*;

public class WorkerListServiceImpl implements WorkerListService {

    private final WorkerListRepository workerListRepository;

    public WorkerListServiceImpl(WorkerListRepository workerListRepository) {
        this.workerListRepository = workerListRepository;
    }

    @Override
    public List<WorkerInfos> getWorkList() {
        List<WorkerInfos> tmp = new ArrayList<>();
        return ;
    }
}
