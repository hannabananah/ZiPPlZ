package com.example.zipplz_be.domain.model.repository;

import com.example.zipplz_be.domain.model.MaterialWorkRelation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaterialWorkRelationRepository extends JpaRepository<MaterialWorkRelation, Integer> {

}
