package com.example.zipplz_be.domain.board.service;

import com.example.zipplz_be.domain.model.entity.Field;
import com.example.zipplz_be.domain.portfolio.dto.PortfolioViewDTO;

import java.util.*;

public interface WorkerListService {
    List<PortfolioViewDTO> getWorkLists();
}
