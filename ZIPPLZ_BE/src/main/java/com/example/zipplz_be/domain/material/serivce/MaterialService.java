package com.example.zipplz_be.domain.material.serivce;

import com.example.zipplz_be.domain.material.dto.MaterialViewDTO;

import java.util.List;

public interface MaterialService {
    List<MaterialViewDTO> getMaterialList();
}
