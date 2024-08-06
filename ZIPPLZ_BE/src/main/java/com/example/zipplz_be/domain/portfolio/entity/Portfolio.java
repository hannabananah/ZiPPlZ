package com.example.zipplz_be.domain.portfolio.entity;

import com.example.zipplz_be.domain.model.entity.Field;
import com.example.zipplz_be.domain.user.entity.User;
import com.example.zipplz_be.domain.user.entity.Worker;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
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
    @JoinColumn(name = "worker", referencedColumnName = "worker_serial")
    private Worker worker;
    @Column(name = "public_relation")
    private String publicRelation;
    private double career;

    @ManyToOne
    @JoinColumn(name = "field_id")
    public Field fieldId;
    @Column(name = "as_period")
    public int asPeriod;
    @Column(name = "work_count")
    public int workCount;

    @Override
    public String toString() {
        return "Portfolio{" +
                "portfolioSerial=" + portfolioSerial +
                ", worker=" + worker +
                ", publicRelation='" + publicRelation + '\'' +
                ", career=" + career +
                ", fieldId=" + fieldId +
                ", asPeriod=" + asPeriod +
                ", workCount=" + workCount +
                '}';
    }

    @Builder
    public Portfolio(Worker worker, Field field) {
        this.worker = worker;
        this.fieldId = field;
        this.publicRelation = "";
        this.career = 0L;
        this.asPeriod = 0;
        this.workCount = 0;
    }
}
