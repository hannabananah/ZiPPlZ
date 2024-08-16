package com.example.zipplz_be.domain.material.serivce;

import com.example.zipplz_be.domain.file.entity.File;
import com.example.zipplz_be.domain.material.dto.MaterialViewDTO;
import com.example.zipplz_be.domain.material.entity.ElasticMaterial;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface MaterialService {

//    List<MaterialViewDTO> getMaterialList();

    List<MaterialViewDTO> getMaterialList(String category);

    List<MaterialViewDTO> getMaterialListAuthenticated(String category, int userSerial);

    void saveConvertedImage(MultipartFile image, int userSerial);

    List<File> getConvertedImages(int userSerial);

    void setMaterialOnWish(int userSerial, int materialSerial);

    void unsetMaterialOnWish(int userSerial, int materialSerial);

    void insertMaterialService(Map<String, Object> params);

    //List<ElasticMaterial> searchMaterialService(Map<String, Object> params);
}
