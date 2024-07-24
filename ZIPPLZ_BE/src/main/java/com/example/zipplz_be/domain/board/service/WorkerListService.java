package com.example.zipplz_be.domain.board.service;

import com.example.zipplz_be.domain.board.dto.WorkerInfosDTO;

import java.util.*;

public interface WorkerListService {

    List<WorkerInfosDTO> getWorkList();
}
