package com.example.zipplz_be.domain.mypage.dto;

import com.example.zipplz_be.domain.user.dto.WorkerLocationDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UpdateWorkerDTO {
    // User 정보
    private int userSerial; // 입력X
    private String tel;

    // Worker 정보
    private List<WorkerLocationDTO> locationList;
}
