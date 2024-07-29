package com.example.zipplz_be.domain.model.repository;

import com.example.zipplz_be.domain.model.dto.FieldDTO;
import com.example.zipplz_be.domain.model.entity.Field;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.*;

public interface FieldRepository extends JpaRepository<Field, Integer> {
    @Query(value="SELECT * " +
            "FROM Field" , nativeQuery = true)
    List<FieldDTO> getFields();
}
