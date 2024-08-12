package com.example.zipplz_be.domain.model.repository;

import com.example.zipplz_be.domain.model.entity.MajorCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MajorCategoryRepository extends JpaRepository<MajorCategory, Integer> {
    MajorCategory findByMajorName(String major);
}
