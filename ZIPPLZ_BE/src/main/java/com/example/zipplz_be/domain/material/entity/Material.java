package com.example.zipplz_be.domain.material.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "material_serial")
    private int materialSerial;
    @Column(name = "material_name")
    private String materialName;
    @Column(name = "field_id")
    private int fieldId;
    private String description;
    @Column(name = "material_price")
    private int materialPrice;
}
