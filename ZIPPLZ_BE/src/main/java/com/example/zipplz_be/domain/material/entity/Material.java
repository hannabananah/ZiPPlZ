package com.example.zipplz_be.domain.material.entity;

import com.example.zipplz_be.domain.model.entity.MajorCategory;
import com.example.zipplz_be.domain.model.entity.MiddleCategory;
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

    @ManyToOne
    @JoinColumn(name = "major_category", referencedColumnName = "major_code")
    private MajorCategory majorCategory;
    @ManyToOne
    @JoinColumn(name = "middle_category", referencedColumnName = "middle_code")
    private MiddleCategory middleCategory;

    private String description;
    @Column(name = "material_price")
    private int materialPrice;
    // @Column(name = "major_category")
    // private int majorCategory;
    // @Column(name = "middle_category")
    // private int middleCategory;
}
