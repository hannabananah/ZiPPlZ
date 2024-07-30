package com.example.zipplz_be.domain.Schedule.repository;

import com.example.zipplz_be.domain.Schedule.entity.Plan;
import com.example.zipplz_be.domain.Schedule.entity.Work;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface WorkRepository extends JpaRepository<Work, Integer> {
    Page<Work> findByPlanSerial(Plan planSerial, Pageable pageable);

    Boolean existsByFieldNameAndPlanSerial(String fieldName, Plan planSerial);
}
