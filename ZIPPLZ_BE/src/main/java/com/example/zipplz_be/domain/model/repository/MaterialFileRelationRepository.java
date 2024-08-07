package com.example.zipplz_be.domain.model.repository;

import com.example.zipplz_be.domain.material.entity.Material;
import com.example.zipplz_be.domain.model.MaterialFileRelation;
import com.example.zipplz_be.domain.model.MaterialFileRelationId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaterialFileRelationRepository extends JpaRepository<MaterialFileRelation, MaterialFileRelationId> {
    MaterialFileRelation findFirstByMaterialSerial(Material materialSerial);
}
