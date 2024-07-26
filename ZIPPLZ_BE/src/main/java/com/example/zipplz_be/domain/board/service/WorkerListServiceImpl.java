package com.example.zipplz_be.domain.board.service;

import com.example.zipplz_be.domain.file.repository.FileRepository;
import com.example.zipplz_be.domain.model.entity.Field;
import com.example.zipplz_be.domain.model.repository.FieldRepository;
import com.example.zipplz_be.domain.model.repository.LocalRepository;
import com.example.zipplz_be.domain.portfolio.dto.PortfolioJoinDTO;
import com.example.zipplz_be.domain.portfolio.dto.PortfolioViewDTO;
import com.example.zipplz_be.domain.portfolio.repository.PortfolioRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class WorkerListServiceImpl implements WorkerListService {

    private final PortfolioRepository portfolioRepository;
    private final FieldRepository fieldRepository;
    private final LocalRepository localRepository;
    private final FileRepository fileRepository;

    public WorkerListServiceImpl(PortfolioRepository portfolioRepository, FieldRepository fieldRepository, LocalRepository localRepository, FileRepository fileRepository) {
        this.portfolioRepository = portfolioRepository;
        this.fieldRepository = fieldRepository;
        this.localRepository = localRepository;
        this.fileRepository = fileRepository;
    }

    @Override
    public List<Field> getFields() {
        return fieldRepository.getFields();
    }

    @Override
    public List<PortfolioViewDTO> getWorkLists() {
        List<PortfolioViewDTO> portfolioViews = new ArrayList<>();
        List<PortfolioJoinDTO> portfolios = portfolioRepository.getPortfolioJoins();
        for (PortfolioJoinDTO portfolio : portfolios) {
            List<String> locations = localRepository.getLocalNames(portfolio.getUser_serial());
            String img = fileRepository.getImg(portfolio.getPortfolio_serial()).get(0).getSave_file();
            PortfolioViewDTO portfolioView = new PortfolioViewDTO(portfolio, locations, img);
            portfolioViews.add(portfolioView);
        }
        return portfolioViews;
    }

//    @Override
//    public List<PortfolioViewDTO> getWorkListByField() {
//        List<PortfolioViewDTO> portfolioViews = new ArrayList<>();
//        List<PortfolioJoinDTO> portfolios = portfolioRepository.getPortfolioJoinsByField();
//        for (PortfolioJoinDTO portfolio : portfolios) {
//            List<String> locations = modelRepository.getLocalNames(portfolio.getUser_serial());
//            String img = fileRepository.getImg(portfolio.getUser_serial());
//            PortfolioViewDTO portfolioView = new PortfolioViewDTO(portfolio, locations, img);
//            portfolioViews.add(portfolioView);
//        }
//        return portfolioViews;
//    }
}
