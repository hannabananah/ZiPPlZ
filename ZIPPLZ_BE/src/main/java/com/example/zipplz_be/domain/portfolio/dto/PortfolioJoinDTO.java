package com.example.zipplz_be.domain.portfolio.dto;

public interface PortfolioJoinDTO {
    int getPortfolio_serial();
    int getWorker();
    String getUser_name();
    Integer getBirth_date();
    double getTemperature();
    double getCareer();
    int getField_id();
    String getField_name();
    int getCertificated_badge();
}
