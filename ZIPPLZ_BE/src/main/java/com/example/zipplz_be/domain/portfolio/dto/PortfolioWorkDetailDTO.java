package com.example.zipplz_be.domain.portfolio.dto;

import com.example.zipplz_be.domain.file.entity.File;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PortfolioWorkDetailDTO {
    //공종 연번, 시작-끝 날짜,시공 가격, 메모 내용
    int workSerial;
    String startDate;
    String endDate;
    int workPrice;
    String workContent;

    //계획 연번, 집주소, 공유내용(계획)
    int planSerial;
    String address;
    String sharedContents;

    //계획 사진들
    List<File> planImageList;

    //고객 닉네임
    String nickname;

    @Builder
    public PortfolioWorkDetailDTO(int workSerial, String startDate, String endDate, int workPrice, String workContent, int planSerial, String address, String sharedContents, List<File> planImageList, String nickname) {
        this.workSerial = workSerial;
        this.startDate = startDate;
        this.endDate = endDate;
        this.workPrice = workPrice;
        this.workContent = workContent;
        this.planSerial = planSerial;
        this.address = address;
        this.sharedContents = sharedContents;
        this.planImageList = planImageList;
        this.nickname = nickname;
    }
}
