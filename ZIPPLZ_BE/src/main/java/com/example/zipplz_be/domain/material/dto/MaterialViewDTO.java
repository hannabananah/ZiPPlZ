package com.example.zipplz_be.domain.material.dto;

public class MaterialViewDTO {
    int materialSerial;
    String materialName;
    String description;
    int materialPrice;
    int majorCategory;
    int middleCategory;
    String img;

    public MaterialViewDTO(MaterialDTO mDTO, String img) {
        this.materialSerial = mDTO.getMaterialSerial();
        this.materialName = mDTO.getMaterialName();
        this.description = mDTO.getDescription();
        this.materialPrice = mDTO.getMaterialPrice();
        this.majorCategory = mDTO.getMajorCategory();
        this.middleCategory = mDTO.getMiddleCategory();
        this.img = img;
    }

    public int getMaterialSerial() {
        return materialSerial;
    }

    public void setMaterialSerial(int materialSerial) {
        this.materialSerial = materialSerial;
    }

    public String getMaterialName() {
        return materialName;
    }

    public void setMaterialName(String materialName) {
        this.materialName = materialName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getMaterialPrice() {
        return materialPrice;
    }

    public void setMaterialPrice(int materialPrice) {
        this.materialPrice = materialPrice;
    }

    public int getMajorCategory() {
        return majorCategory;
    }

    public void setMajorCategory(int majorCategory) {
        this.majorCategory = majorCategory;
    }

    public int getMiddleCategory() {
        return middleCategory;
    }

    public void setMiddleCategory(int middleCategory) {
        this.middleCategory = middleCategory;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    @Override
    public String toString() {
        return "MaterialViewDTO{" +
                "materialSerial=" + materialSerial +
                ", materialName='" + materialName + '\'' +
                ", description='" + description + '\'' +
                ", materialPrice=" + materialPrice +
                ", majorCategory=" + majorCategory +
                ", middleCategory=" + middleCategory +
                ", img='" + img + '\'' +
                '}';
    }
}
