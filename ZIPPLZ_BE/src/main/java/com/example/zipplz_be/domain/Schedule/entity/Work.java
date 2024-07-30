package com.example.zipplz_be.domain.Schedule.entity;

import com.example.zipplz_be.domain.model.entity.Field;
import com.example.zipplz_be.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import com.example.zipplz_be.domain.user.entity.Worker;

import java.sql.Timestamp;

@Entity
@Getter
@Setter
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
    Plan planSerial;

    @ManyToOne
    @JoinColumn(name="field_code")
    Field fieldCode;

    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp startDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp endDate;

    @Column(name="is_completed")
    int isCompleted;

    @Column(name="work_price")
    int workPrice;

    @Column(name="as_score")
    int asScore;
    @Column(name="work_content")
    String workContent;

    @Column(name="field_name")
    String fieldName;

    @Builder
    public Work(Plan plan, Field field, String fieldName) {
        this.planSerial = plan;
        this.fieldCode = field;
        this.fieldName = fieldName;
        isCompleted = 0;
    }
}
