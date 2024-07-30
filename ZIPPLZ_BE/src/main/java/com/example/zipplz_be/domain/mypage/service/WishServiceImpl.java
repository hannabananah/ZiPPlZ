package com.example.zipplz_be.domain.mypage.service;

import com.example.zipplz_be.domain.file.repository.FileRepository;
import com.example.zipplz_be.domain.model.repository.LocalRepository;
import com.example.zipplz_be.domain.mypage.repository.WishRepository;
import com.example.zipplz_be.domain.portfolio.dto.PortfolioFileDTO;
import com.example.zipplz_be.domain.portfolio.dto.PortfolioJoinDTO;
import com.example.zipplz_be.domain.portfolio.dto.PortfolioViewDTO;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class WishServiceImpl implements WishService {

    private final WishRepository wishRepository;
    private final LocalRepository localRepository;
    private final FileRepository fileRepository;

    public WishServiceImpl(WishRepository wishRepository, LocalRepository localRepository, FileRepository fileRepository) {
        this.wishRepository = wishRepository;
        this.localRepository = localRepository;
        this.fileRepository = fileRepository;
    }

    @Override
    public List<PortfolioViewDTO> getWorkerWishList(int type, int wishSerial) {
        List<PortfolioViewDTO> portfolioViews = new ArrayList<>();
        List<PortfolioJoinDTO> portfolios = wishRepository.getWorkerWishList(type, wishSerial);
        for (PortfolioJoinDTO portfolio : portfolios) {
            List<String> locations = localRepository.getLocalNames(portfolio.getUser_serial());
            List<PortfolioFileDTO> files = fileRepository.getImg(portfolio.getPortfolio_serial());
            String img = null;
            if (!files.isEmpty()) {
                img = fileRepository.getImg(portfolio.getPortfolio_serial()).getFirst().getSaveFile();
            }
            img = fileRepository.getImg(portfolio.getPortfolio_serial()).getFirst().getSaveFile();
            PortfolioViewDTO portfolioView = new PortfolioViewDTO(portfolio, locations, img);
            portfolioViews.add(portfolioView);
        }
        return portfolioViews;
    }
}
