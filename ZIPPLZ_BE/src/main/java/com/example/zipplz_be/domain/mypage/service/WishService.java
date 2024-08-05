package com.example.zipplz_be.domain.mypage.service;

import com.example.zipplz_be.domain.material.dto.MaterialViewDTO;
import com.example.zipplz_be.domain.portfolio.dto.PortfolioViewDTO;

import java.util.List;

public interface WishService {
    int addWish(int userSerial, int wishType, int wishSerial);
    List<PortfolioViewDTO> getWorkerWishList(int wishType, int userSerial);
    List<MaterialViewDTO> getMaterialWishList(int wishType, int userSerial);
}
