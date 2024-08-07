package com.example.zipplz_be.domain.material.repository;

import com.example.zipplz_be.domain.material.dto.MaterialDTO;
import com.example.zipplz_be.domain.material.entity.Material;
import com.example.zipplz_be.domain.model.entity.MajorCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Integer> {
//    @Query(value = "SELECT * " +
//            "FROM Material", nativeQuery = true)
//    List<MaterialDTO> getMaterialList();
    List<Material> findAll();
    List<Material> findAllByMajorCategory(MajorCategory major);
}
