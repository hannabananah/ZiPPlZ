package com.example.zipplz_be.domain.model.service;

import com.example.zipplz_be.domain.model.dto.FieldDTO;
import com.example.zipplz_be.domain.model.dto.GugunDTO;
import com.example.zipplz_be.domain.model.dto.SidoDTO;

import java.util.List;

public interface DefaultService {
    List<SidoDTO> getSidoList();
    List<GugunDTO> getGugunList(int Sido);
    List<FieldDTO> getFieldList();
}
