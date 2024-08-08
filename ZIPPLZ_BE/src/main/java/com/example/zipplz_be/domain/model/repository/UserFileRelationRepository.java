package com.example.zipplz_be.domain.model.repository;

import com.example.zipplz_be.domain.model.UserFileRelation;
import com.example.zipplz_be.domain.model.UserFileRelationId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserFileRelationRepository extends JpaRepository<UserFileRelation, UserFileRelationId> {
}
