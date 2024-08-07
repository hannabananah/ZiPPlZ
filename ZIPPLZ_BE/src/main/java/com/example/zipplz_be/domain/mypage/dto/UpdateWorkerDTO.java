package com.example.zipplz_be.domain.mypage.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateWorkerDTO {
    // User 정보
    private int userSerial; // 입력X
    private String birthDate;
    private String tel;

    // Worker 정보
    private String company;
    private String companyAddress;
    private String businessNumber;
}
