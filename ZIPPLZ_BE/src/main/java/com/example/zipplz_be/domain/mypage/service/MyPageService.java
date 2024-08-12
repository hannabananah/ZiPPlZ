package com.example.zipplz_be.domain.mypage.service;

import com.example.zipplz_be.domain.board.dto.FindWorkerListDTO;
import com.example.zipplz_be.domain.board.dto.QuestionListDTO;
import com.example.zipplz_be.domain.board.dto.ShowBoardListDTO;
import com.example.zipplz_be.domain.mypage.dto.LocalResponseDTO;
import com.example.zipplz_be.domain.mypage.dto.MyPageResponseDTO;
import com.example.zipplz_be.domain.mypage.dto.UpdateCustomerDTO;
import com.example.zipplz_be.domain.mypage.dto.UpdateWorkerDTO;
import com.example.zipplz_be.domain.portfolio.dto.PortfolioViewDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface MyPageService {

    MyPageResponseDTO getMyPage(int userSerial, String role);

    boolean updateCustomer(UpdateCustomerDTO updateCustomerDTO);

    boolean updateWorker(UpdateWorkerDTO updateWorkerDTO);

    boolean changePassword(int userSerial, String newPassword);

    void setProfileImg(int userSerial, MultipartFile image) throws IOException;

    void deleteProfileImg(int userSerial) throws IOException;

    List<LocalResponseDTO> getWorkerLocations(int userSerial);

    // 내가 쓴
    List<QuestionListDTO> getMyQuestions(int userSerial);

    List<ShowBoardListDTO> getMyShowBoards(int userSerial);

    List<FindWorkerListDTO> getMyFindWorkers(int userSerial);

    // 찜
    List<PortfolioViewDTO> getWishedWorkers(int userSerial);

    List<QuestionListDTO> getWishedQuestions(int userSerial);

    List<ShowBoardListDTO> getWishedShowBoards(int userSerial);

    List<FindWorkerListDTO> getWishedFindWorkers(int userSerial);

    // 회원 탈퇴
    void deleteAccount(int userSerial);

}
