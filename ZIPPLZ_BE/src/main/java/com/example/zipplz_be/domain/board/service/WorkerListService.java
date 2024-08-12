package com.example.zipplz_be.domain.board.service;

import com.example.zipplz_be.domain.portfolio.dto.PortfolioViewDTO;

import java.util.*;

public interface WorkerListService {
    List<PortfolioViewDTO> getWorkLists();
    List<PortfolioViewDTO> getWorkListByField(int fieldCode);
    List<PortfolioViewDTO> getWorkListByName(String name);
    List<PortfolioViewDTO> getWorkListTop();

}
