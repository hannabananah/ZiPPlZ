package com.example.zipplz_be.domain.mypage.service;

import com.example.zipplz_be.domain.portfolio.dto.PortfolioViewDTO;

import java.util.List;

public interface WishService {
    List<PortfolioViewDTO> getWorkerWishList(int type, int wishSerial);
}
