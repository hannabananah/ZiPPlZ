package com.example.zipplz_be.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class InsertWorkerDTO {
    private int userSerial;
    private List<LocationDTO> locationList;
    private List<Integer> specialty;
    private String businessNumber;
    private String company;
//    private String
}
