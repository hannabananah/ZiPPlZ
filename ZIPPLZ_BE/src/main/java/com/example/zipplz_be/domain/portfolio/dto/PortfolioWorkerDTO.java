package com.example.zipplz_be.domain.portfolio.dto;

import com.example.zipplz_be.domain.user.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PortfolioWorkerDTO {
    private String company;
    private String companyAddress;
    private String businessNumber;
    private int hasAsBadge;
    private int certificatedBadge;

    @Builder
    public PortfolioWorkerDTO(String company, String companyAddress, String businessNumber, int hasAsBadge, int certificatedBadge) {
        this.company = company;
        this.companyAddress = companyAddress;
        this.businessNumber = businessNumber;
        this.hasAsBadge = hasAsBadge;
        this.certificatedBadge = certificatedBadge;
    }
}
