package com.example.zipplz_be.domain.mypage.service;

import com.example.zipplz_be.domain.mypage.dto.MyPageResponseDTO;
import com.example.zipplz_be.domain.mypage.dto.UpdateCustomerDTO;
import com.example.zipplz_be.domain.mypage.dto.UpdateWorkerDTO;

public interface MyPageService {

    MyPageResponseDTO getMyPage(int userSerial, String role);

    boolean updateCustomer(UpdateCustomerDTO updateCustomerDTO);

    boolean updateWorker(UpdateWorkerDTO updateWorkerDTO);

    boolean changePassword(int userSerial, String newPassword);


}
