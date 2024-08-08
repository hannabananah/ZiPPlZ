package com.example.zipplz_be.domain.model.repository;

import com.example.zipplz_be.domain.model.MaterialWorkRelation;
import com.example.zipplz_be.domain.schedule.entity.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaterialWorkRelationRepository extends JpaRepository<MaterialWorkRelation, Integer> {
    List<MaterialWorkRelation> findByWorkSerial(Work work);

}
