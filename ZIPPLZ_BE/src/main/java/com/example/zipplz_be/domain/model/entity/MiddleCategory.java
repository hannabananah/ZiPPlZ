package com.example.zipplz_be.domain.model.entity;

import com.example.zipplz_be.domain.model.MajorToMiddleId;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@IdClass(MajorToMiddleId.class)
public class MiddleCategory {
    @Id
    @Column(name = "major_code")
    private int majorCode;

    @Id
    @Column(name = "middle_code")
    private int middleCode;

    @Column(name = "middle_name")
    private String middleName;
}