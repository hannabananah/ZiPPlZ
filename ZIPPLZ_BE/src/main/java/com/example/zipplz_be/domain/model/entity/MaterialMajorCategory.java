package com.example.zipplz_be.domain.model.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class MaterialMajorCategory {
    @Id
    @Column(name = "major_code")
    private int majorCode;
    @Column(name = "major_name")
    private String majorName;
}
