package com.example.zipplz_be.domain.model;

import com.example.zipplz_be.domain.material.entity.Material;
import com.example.zipplz_be.domain.schedule.entity.Work;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@IdClass(MaterialWorkRelation.class)
@Getter
@NoArgsConstructor
public class MaterialWorkRelation {
    @Id
    @ManyToOne
    @JoinColumn(name="material_serial")
    private Material materialSerial;
    @Id
    @ManyToOne
    @JoinColumn(name="work_serial")
    private Work workSerial;

    @Builder
    public MaterialWorkRelation(Material materialSerial, Work workSerial) {
        this.materialSerial = materialSerial;
        this.workSerial = workSerial;
    }
}
