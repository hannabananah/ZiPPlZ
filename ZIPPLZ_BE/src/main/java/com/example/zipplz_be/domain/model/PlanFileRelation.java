package com.example.zipplz_be.domain.model;

import com.example.zipplz_be.domain.file.entity.File;
import com.example.zipplz_be.domain.material.entity.Material;
import com.example.zipplz_be.domain.schedule.entity.Plan;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@IdClass(PlanFileRelationId.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlanFileRelation {
    @Id
    @ManyToOne
    @JoinColumn(name="plan_serial")
    private Plan planSerial;
    @Id
    @ManyToOne
    @JoinColumn(name="file_serial")
    private File fileSerial;

}
