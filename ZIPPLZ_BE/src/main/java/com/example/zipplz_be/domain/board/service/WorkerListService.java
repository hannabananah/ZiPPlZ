package com.example.zipplz_be.domain.board.service;

import com.example.zipplz_be.domain.portfolio.dto.PortfolioViewDTO;

import java.util.*;

public interface WorkerListService {
    List<String> getFields();
    List<PortfolioViewDTO> getWorkLists();
//    List<PortfolioViewDTO> getWorkListByField();
}
