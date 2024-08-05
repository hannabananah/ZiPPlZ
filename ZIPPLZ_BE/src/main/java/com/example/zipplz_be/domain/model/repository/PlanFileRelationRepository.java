package com.example.zipplz_be.domain.model.repository;

import com.example.zipplz_be.domain.model.PlanFileRelation;
import com.example.zipplz_be.domain.schedule.entity.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlanFileRelationRepository extends JpaRepository<PlanFileRelation,Integer> {
    List<PlanFileRelation> findByPlanSerial(Plan plan);

}
