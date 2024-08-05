package com.example.zipplz_be.domain.model;

import com.example.zipplz_be.domain.file.entity.File;
import com.example.zipplz_be.domain.material.entity.Material;
import com.example.zipplz_be.domain.schedule.entity.Plan;
import jakarta.persistence.*;
import lombok.*;

@Entity
@IdClass(PlanFileRelationId.class)
@Getter
@Setter
@NoArgsConstructor
public class PlanFileRelation {
    @Id
    @ManyToOne
    @JoinColumn(name="plan_serial")
    private Plan planSerial;
    @Id
    @ManyToOne
    @JoinColumn(name="file_serial")
    private File fileSerial;

    @Builder
    public PlanFileRelation(Plan planSerial, File fileSerial) {
        this.planSerial = planSerial;
        this.fileSerial = fileSerial;
    }
}
