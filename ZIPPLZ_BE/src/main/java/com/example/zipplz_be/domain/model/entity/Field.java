package com.example.zipplz_be.domain.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Field {
    @Id
    @Column(name = "field_code")
    private int fieldCode;
    @Column(name = "field_name")
    private String fieldName;
}
