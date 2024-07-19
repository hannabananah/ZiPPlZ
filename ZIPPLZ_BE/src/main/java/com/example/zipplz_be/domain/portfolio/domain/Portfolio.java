package com.example.zipplz_be.domain.portfolio.domain;

import com.example.zipplz_be.domain.user.domain.Worker;
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
    private int portfolioSerial;
    @ManyToOne
    @JoinColumn(name = "worker_serial")
    private Worker workerSerial;
    private String publicRelation;
    private double career;
    public int fieldId;
    public int asPeriod;
}
