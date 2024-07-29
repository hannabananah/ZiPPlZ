package com.example.zipplz_be.domain.portfolio.entity;

import com.example.zipplz_be.domain.user.entity.Worker;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Portfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "portfolio_serial")
    private int portfolioSerial;
    @ManyToOne
    @JoinColumn(name = "user_serial")
    private Worker userSerial;
    @Column(name = "public_relation")
    private String publicRelation;
    private double career;
    @Column(name = "field_id")
    public int fieldId;
    @Column(name = "as_period")
    public int asPeriod;
}
