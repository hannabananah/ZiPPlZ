package com.example.zipplz_be.domain.mypage.controller;

import com.example.zipplz_be.domain.model.dto.ResponseDTO;
import com.example.zipplz_be.domain.user.dto.CustomUserDetails;
import com.example.zipplz_be.domain.mypage.dto.UpdateCustomerDTO;
import com.example.zipplz_be.domain.mypage.dto.UpdateWorkerDTO;
import com.example.zipplz_be.domain.mypage.service.MyPageService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/mypage")
@RestController
public class MyPageController {

    private final MyPageService myPageService;

    @Getter
    public static class PasswordRequest {
        private String pwd;
    }

    @PostMapping("/update-customer")
    public ResponseEntity<ResponseDTO> updateCustomer(Authentication authentication, @RequestBody UpdateCustomerDTO updateCustomerDTO) {

        ResponseDTO responseDTO;
        HttpStatus status;

        try {
            int userSerial = getUserSerial(authentication);
            updateCustomerDTO.setUserSerial(userSerial);
            boolean result = myPageService.updateCustomer(updateCustomerDTO);
            if (!result) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "고객 정보 업데이트 실패");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "고객 정보 업데이트 성공", updateCustomerDTO);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }

    @PostMapping("/update-worker")
    public ResponseEntity<ResponseDTO> updateWorker(Authentication authentication, @RequestBody UpdateWorkerDTO updateWorkerDTO) {

        ResponseDTO responseDTO;
        HttpStatus status;

        try {
            int userSerial = getUserSerial(authentication);
            updateWorkerDTO.setUserSerial(userSerial);
            boolean result = myPageService.updateWorker(updateWorkerDTO);
            if (!result) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "시공자 정보 업데이트 실패");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "시공자 정보 업데이트 성공", updateWorkerDTO);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }

    @PostMapping("/change-pw")
    public ResponseEntity<ResponseDTO> changePassword(Authentication authentication, @RequestBody PasswordRequest passwordRequest) {
        ResponseDTO responseDTO;
        HttpStatus status;
        try {
            int userSerial = getUserSerial(authentication);
            boolean result = myPageService.changePassword(userSerial, passwordRequest.getPwd());
            if (!result) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "비밀번호 변경 실패");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "비밀번호 변경 성공");
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }

    public int getUserSerial(Authentication authentication) {
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        return customUserDetails.getUserSerial();
    }

}

