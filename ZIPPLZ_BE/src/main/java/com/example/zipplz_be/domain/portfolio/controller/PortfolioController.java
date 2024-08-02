package com.example.zipplz_be.domain.portfolio.controller;

import com.example.zipplz_be.domain.model.dto.ResponseDTO;
import com.example.zipplz_be.domain.portfolio.dto.PortfolioInfoDTO;
import com.example.zipplz_be.domain.portfolio.entity.Portfolio;
import com.example.zipplz_be.domain.portfolio.exception.PortfolioNotFoundException;
import com.example.zipplz_be.domain.portfolio.service.PortfolioService;
import com.example.zipplz_be.domain.user.exception.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/portfolio")
public class PortfolioController {
    private final PortfolioService portfolioService;

    PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    // 시공자별 포트폴리오 목록 조회
    // 시공자가 가진 포트폴리오의 분야별 목록이 필요함. -> 해당 분야와 목록으로 포트폴리오 찾는 api로 번호 찾고 전환 가능
    @GetMapping("/list/{userSerial}")
    public ResponseEntity<?> getPortfolioList(@PathVariable int userSerial) {
        ResponseDTO<?> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            List<Portfolio> portfolioList = portfolioService.getPortfolioListService(userSerial);

            status= HttpStatus.OK;
            responseDTO = new ResponseDTO<>(status.value(), "조회 성공!", portfolioList);
        } catch (UserNotFoundException e) {
            status = HttpStatus.BAD_REQUEST;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch(Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }


    //포트폴리오 상세조회
    @GetMapping("/{portfolioSerial}")
    public ResponseEntity<?> getPortfolioInfo(@PathVariable int portfolioSerial) {
        ResponseDTO<?> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            PortfolioInfoDTO portfolioInfoDTO = portfolioService.getPortfolioInfoService(portfolioSerial);

            status= HttpStatus.OK;
            responseDTO = new ResponseDTO<>(status.value(), "조회 성공!", portfolioInfoDTO);
        } catch(PortfolioNotFoundException e) {
            status = HttpStatus.NOT_FOUND;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch(Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);

    }


    //포트폴리오 수정
    //포트폴리오 삭제


    //매너온도와 리뷰 평균 조회

    //리뷰 목록 조회하기(페이징, 각 리뷰별 평균 별점도 리턴 필요)
    //지피티로 프롬프트 보내서 요약하기


    //사장님 댓글 작성하기


    //시공자 일정 조회(본인의 공종 조회)









}
