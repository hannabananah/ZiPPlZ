package com.example.zipplz_be.domain.portfolio.service;

import com.example.zipplz_be.domain.file.entity.File;
import com.example.zipplz_be.domain.file.repository.FileRepository;
import com.example.zipplz_be.domain.model.entity.Local;
import com.example.zipplz_be.domain.model.repository.LocalRepository;
import com.example.zipplz_be.domain.portfolio.dto.PortfolioFileDTO;
import com.example.zipplz_be.domain.portfolio.dto.PortfolioInfoDTO;
import com.example.zipplz_be.domain.portfolio.dto.PortfolioUserDTO;
import com.example.zipplz_be.domain.portfolio.dto.PortfolioWorkerDTO;
import com.example.zipplz_be.domain.portfolio.entity.Portfolio;
import com.example.zipplz_be.domain.portfolio.exception.PortfolioNotFoundException;
import com.example.zipplz_be.domain.portfolio.repository.PortfolioRepository;
import com.example.zipplz_be.domain.user.entity.User;
import com.example.zipplz_be.domain.user.exception.UserNotFoundException;
import com.example.zipplz_be.domain.user.repository.UserRepository;
import com.example.zipplz_be.domain.user.repository.WorkerRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import com.example.zipplz_be.domain.user.entity.Worker;


@Service
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;
    private final WorkerRepository workerRepository;
    private final UserRepository userRepository;
    private final FileRepository fileRepository;
    private final LocalRepository localRepository;

    PortfolioService(LocalRepository localRepository, FileRepository fileRepository,UserRepository userRepository, PortfolioRepository portfolioRepository, WorkerRepository workerRepository) {
        this.localRepository = localRepository;
        this.fileRepository = fileRepository;
        this.userRepository = userRepository;
        this.portfolioRepository = portfolioRepository;
        this.workerRepository = workerRepository;
    }

    @Transactional
    public List<Portfolio> getPortfolioListService(int userSerial) {
        User user = userRepository.findByUserSerial(userSerial);
        Worker worker = workerRepository.findByUserSerial(user);

        if(worker == null) {
            throw new UserNotFoundException("해당 유저 연번은 유효하지 않습니다.");
        }

        return portfolioRepository.findByUserSerial(worker);
    }

    @Transactional
    public PortfolioInfoDTO getPortfolioInfoService(int portfolioSerial) {
        Portfolio portfolio = portfolioRepository.findByPortfolioSerial(portfolioSerial);

        //포트폴리오 연번 유효성 검사
        if(portfolio == null) {
            throw new PortfolioNotFoundException("해당 포트폴리오는 존재하지 않습니다.");
        }

        System.out.println(portfolio.toString());

        Worker worker = portfolio.getUserSerial();
        PortfolioWorkerDTO portfolioWorkerDTO = PortfolioWorkerDTO.builder()
                .businessNumber(worker.getBusinessNumber())
                .certificatedBadge(worker.getCertificatedBadge())
                .hasAsBadge(worker.getHasAsBadge())
                .companyAddress(worker.getCompanyAddress())
                .company(worker.getCompany())
                .build();


        User user = worker.getUserSerial();
        List<PortfolioFileDTO> imageList = fileRepository.getImg(portfolioSerial);
        File userProfile = fileRepository.findByFileSerial(user.getFileSerial().getFileSerial());
        List<String> localList = localRepository.getLocalNames(user.getUserSerial());
        PortfolioUserDTO portfolioUserDTO = PortfolioUserDTO.builder()
                .birthDate(user.getBirthDate())
                .userName(user.getUserName())
                .tel(user.getTel())
                .email(user.getEmail())
                .fileSerial(userProfile.getFileSerial()).build();


        //포트폴리오 번호로 포트폴리오에서 필요한 정보들 찾고 DTO 리턴
        PortfolioInfoDTO portfolioInfoDTO = PortfolioInfoDTO.builder()
                .asPeriod(portfolio.getAsPeriod())
                .career(portfolio.getCareer())
                .workCount(portfolio.getWorkCount())
                .publicRelation(portfolio.getPublicRelation())
                .user(portfolioUserDTO)
                .worker(portfolioWorkerDTO)
                .userProfile(userProfile)
                .imageList(imageList)
                .localList(localList).build();

        return portfolioInfoDTO;
    }
}
