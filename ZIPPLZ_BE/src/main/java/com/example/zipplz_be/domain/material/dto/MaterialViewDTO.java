package com.example.zipplz_be.domain.material.dto;

public class MaterialViewDTO {
    int materialSerial;
    String materialName;
    int fieldId;
    String description;
    int materialPrice;
    String img;

    public MaterialViewDTO(MaterialDTO mDTO, String img) {
        this.materialSerial = mDTO.getMaterialSerial();
        this.materialName = mDTO.getMaterialName();
        this.fieldId = mDTO.getFieldId();
        this.description = mDTO.getDescription();
        this.materialPrice = mDTO.getMaterialPrice();
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

    public int getFieldId() {
        return fieldId;
    }

    public void setFieldId(int fieldId) {
        this.fieldId = fieldId;
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
                ", fieldId=" + fieldId +
                ", description='" + description + '\'' +
                ", materialPrice=" + materialPrice +
                ", img='" + img + '\'' +
                '}';
    }
}
