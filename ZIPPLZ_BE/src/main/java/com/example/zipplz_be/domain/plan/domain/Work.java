package com.example.zipplz_be.domain.plan.domain;

import com.example.zipplz_be.domain.user.domain.Worker;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Work {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int workSerial;
    @ManyToOne
    @JoinColumn(name = "worker_serial")
    private Worker workerSerial;
    @ManyToOne
    @JoinColumn(name = "plan_serial")
    private Plan planSerial;
    private int fieldId;
    private Date startDate;
    private Date endDate;
    private int isCompleted;
    private int workPrice;
    private int asScore;
    private String workContent;
}
