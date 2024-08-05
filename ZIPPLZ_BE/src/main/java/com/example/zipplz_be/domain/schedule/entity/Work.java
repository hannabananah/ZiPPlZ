package com.example.zipplz_be.domain.schedule.entity;

import com.example.zipplz_be.domain.model.entity.Field;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.example.zipplz_be.domain.user.entity.Worker;

import java.sql.Timestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Work {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="work_serial")
    int workSerial;

    @ManyToOne
    @JoinColumn(name="worker_serial")
    Worker workerSerial;

    @ManyToOne
    @JoinColumn(name="plan_serial")
    @JsonBackReference
    Plan planSerial;

    @ManyToOne
    @JoinColumn(name="field_code")
    Field fieldCode;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="start_date")
    private Timestamp startDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="end_date")
    private Timestamp endDate;

    @Column(name="is_completed")
    int isCompleted;

    @Column(name="work_price")
    int workPrice;

    @Column(name="work_content")
    String workContent;

    @Column(name="field_name")
    String fieldName;

    @Builder
    public Work(Plan plan, Field field, String fieldName, Timestamp startDate, Timestamp endDate, int workPrice) {
        this.planSerial = plan;
        this.fieldCode = field;
        this.fieldName = fieldName;
        isCompleted = 0;
        this.startDate = startDate;
        this.endDate = endDate;
        this.workPrice = workPrice;
    }

    @Builder
    public Work(Plan plan, Field field, String fieldName) {
        this.planSerial = plan;
        this.fieldCode = field;
        this.fieldName = fieldName;
        isCompleted = 0;
    }
}
