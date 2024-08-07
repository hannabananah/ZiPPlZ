package com.example.zipplz_be.domain.material.dto;

import com.example.zipplz_be.domain.file.entity.File;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MaterialViewDTO {
    private String materialName;
    private String majorCategory;
    private String description;
    private int materialPrice;
    private File img;

    @Builder
    public MaterialViewDTO(String materialName, String majorCategory, String description, int materialPrice, File img) {
        this.materialName = materialName;
        this.majorCategory = majorCategory;
        this.description = description;
        this.materialPrice = materialPrice;
        this.img = img;
    }
}