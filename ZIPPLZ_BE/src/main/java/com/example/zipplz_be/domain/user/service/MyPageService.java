package com.example.zipplz_be.domain.user.service;

import com.example.zipplz_be.domain.user.dto.UpdateCustomerDTO;
import com.example.zipplz_be.domain.user.dto.UpdateWorkerDTO;

public interface MyPageService {
    boolean updateCustomer(UpdateCustomerDTO updateCustomerDTO);

    boolean updateWorker(UpdateWorkerDTO updateWorkerDTO);

    boolean changePassword(int userSerial, String newPassword);

}
