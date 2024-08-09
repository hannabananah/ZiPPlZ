package com.example.zipplz_be.domain.mypage.controller;

import com.example.zipplz_be.domain.model.dto.ResponseDTO;
import com.example.zipplz_be.domain.mypage.dto.MyPageResponseDTO;
import com.example.zipplz_be.domain.user.dto.CustomUserDetails;
import com.example.zipplz_be.domain.mypage.dto.UpdateCustomerDTO;
import com.example.zipplz_be.domain.mypage.dto.UpdateWorkerDTO;
import com.example.zipplz_be.domain.mypage.service.MyPageService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RequestMapping("/mypage")
@RestController
public class MyPageController {

    private final MyPageService myPageService;

    @Getter
    public static class PasswordRequest {
        private String password;
    }

    @GetMapping("")
    public ResponseEntity<ResponseDTO> getMyPage(Authentication authentication) {

        ResponseDTO responseDTO;
        HttpStatus status;

        try {
            MyPageResponseDTO myPage = myPageService.getMyPage(this.getUserSerial(authentication), this.getUserRole(authentication));
            status = HttpStatus.OK;
            responseDTO = new ResponseDTO<>(status.value(), "마이페이지 조회 성공", myPage);
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
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
                responseDTO = new ResponseDTO<>(status.value(), "고객 정보 업데이트 성공");
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
                responseDTO = new ResponseDTO<>(status.value(), "시공자 정보 업데이트 성공");
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
            boolean result = myPageService.changePassword(userSerial, passwordRequest.getPassword());
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

    @PostMapping("/profile-img")
    public ResponseEntity<ResponseDTO> setProfileImg(Authentication authentication, @RequestPart MultipartFile image) {
        ResponseDTO responseDTO;
        HttpStatus status;
        try {
            myPageService.setProfileImg(this.getUserSerial(authentication), image);
            status = HttpStatus.OK;
            responseDTO = new ResponseDTO<>(status.value(), "프로필 이미지 변경 성공");
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }

    @DeleteMapping("/profile-img")
    public ResponseEntity<ResponseDTO> deleteProfileImg(Authentication authentication) {
        ResponseDTO responseDTO;
        HttpStatus status;
        try {
            myPageService.deleteProfileImg(this.getUserSerial(authentication));
            status = HttpStatus.OK;
            responseDTO = new ResponseDTO<>(status.value(), "프로필 이미지 삭제 성공");
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }

    // 시공자 활동지역 조회
    public ResponseEntity<ResponseDTO> getWorkerLocations(Authentication authentication) {
        ResponseDTO responseDTO;
        HttpStatus status;
        try {
            myPageService.getWorkerLocations(this.getUserSerial(authentication));
            status = HttpStatus.OK;
            responseDTO = new ResponseDTO<>(status.value(), "시공자 활동지역 조회 성공");
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

    public String getUserRole(Authentication authentication) {
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        return customUserDetails.getRole();
    }


}

