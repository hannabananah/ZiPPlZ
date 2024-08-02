package com.example.zipplz_be.domain.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Gugun {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="gugun_code")
    private int gugunCode;
    @ManyToOne
    @JoinColumn(name="sido_code")
    private Sido sidoCode;
    @Column(name="gugun_name")
    private String gugunName;
}
