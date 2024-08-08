package com.example.zipplz_be.domain.chatting.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContractDTO {
     String workerName;
     String company;
     String businessNumber;
     String workerTel;

     String customerName;
     String customerTel;

     String address;

     String startDate;
     String endDate;
     int workPrice;
     String fieldName;

     Integer asPeriod;
     List<String> materialList;
}
