package com.example.zipplz_be.domain.model.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class MajorCategory {
    @Id
    @Column(name = "major_code")
    private int majorCode;
    @Column(name = "major_name")
    private String majorName;

    @Override
    public String toString() {
        return "MajorCategory{" +
                "majorCode=" + majorCode +
                ", majorName='" + majorName + '\'' +
                '}';
    }
}
