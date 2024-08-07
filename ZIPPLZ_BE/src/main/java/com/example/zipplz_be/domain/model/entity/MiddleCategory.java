package com.example.zipplz_be.domain.model.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class MiddleCategory {
    @Id
    @Column(name = "major_code")
    private int majorCode;

    @Id
    @Column(name = "middle_code")
    private int middleCode;

    @Column(name = "middle_name")
    private String middleName;

    @ManyToOne
    @JoinColumn(name="major_code")
    private MajorCategory major;
}
