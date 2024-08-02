package com.example.zipplz_be.domain.material.serivce;

import com.example.zipplz_be.domain.file.repository.FileRepository;
import com.example.zipplz_be.domain.material.dto.MaterialDTO;
import com.example.zipplz_be.domain.material.dto.MaterialFileDTO;
import com.example.zipplz_be.domain.material.dto.MaterialViewDTO;
import com.example.zipplz_be.domain.material.repository.MaterialRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MaterialServiceImpl implements MaterialService {

    private final MaterialRepository materialRepository;
    private final FileRepository fileRepository;

    public MaterialServiceImpl(MaterialRepository materialRepository, FileRepository fileRepository) {
        this.materialRepository = materialRepository;
        this.fileRepository = fileRepository;
    }

    @Override
    public List<MaterialViewDTO> getMaterialList() {
        List<MaterialViewDTO> materialViews = new ArrayList<>();
        List<MaterialDTO> materials = materialRepository.getMaterialList();
        for (MaterialDTO material : materials) {
            List<MaterialFileDTO> files = fileRepository.getMaterialImg(material.getMaterialSerial());
            String img = null;
            if (!files.isEmpty()) {
                img = files.getFirst().getSaveFile();
            }
            MaterialViewDTO materialView = new MaterialViewDTO(material, img);
            materialViews.add(materialView);
        }
        return materialViews;
    }
}
