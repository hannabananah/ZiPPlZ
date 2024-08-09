package com.example.zipplz_be.domain.mypage.service;

import com.example.zipplz_be.domain.mypage.dto.LocalResponseDTO;
import com.example.zipplz_be.domain.mypage.dto.MyPageResponseDTO;
import com.example.zipplz_be.domain.mypage.dto.UpdateCustomerDTO;
import com.example.zipplz_be.domain.mypage.dto.UpdateWorkerDTO;
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
}
