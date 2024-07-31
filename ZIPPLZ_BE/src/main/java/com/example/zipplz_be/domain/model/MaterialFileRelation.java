package com.example.zipplz_be.domain.model;

import com.example.zipplz_be.domain.file.entity.File;
import com.example.zipplz_be.domain.material.entity.Material;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@IdClass(MaterialFileRelationId.class)
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MaterialFileRelation {
    @Id
    @ManyToOne
    @JoinColumn(name="material_serial")
    private Material materialSerial;
    @Id
    @ManyToOne
    @JoinColumn(name="file_serial")
    private File fileSerial;
}
