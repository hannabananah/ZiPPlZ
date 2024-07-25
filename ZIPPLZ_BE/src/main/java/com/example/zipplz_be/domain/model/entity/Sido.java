package com.example.zipplz_be.domain.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Sido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sidoCode;
    @Column(name="sido_name")
    private String sidoName;
}
