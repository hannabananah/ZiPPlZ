package com.example.zipplz_be.domain.material.repository;

import com.example.zipplz_be.domain.material.dto.MaterialDTO;
import com.example.zipplz_be.domain.material.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MaterialRepository extends JpaRepository<Material, Integer> {
    @Query(value = "SELECT * " +
            "FROM Material", nativeQuery = true)
    List<MaterialDTO> getMaterialList();
}
