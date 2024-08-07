package com.example.zipplz_be.domain.material.serivce;

import com.example.zipplz_be.domain.material.dto.MaterialViewDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MaterialService {

//    List<MaterialViewDTO> getMaterialList();

    List<MaterialViewDTO> getMaterialList(String category);

    void saveConvertedImage(MultipartFile image, int userSerial);
}
