package com.example.zipplz_be.domain.model.repository;

import com.example.zipplz_be.domain.model.UserFileRelation;
import com.example.zipplz_be.domain.model.UserFileRelationId;
import com.example.zipplz_be.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserFileRelationRepository extends JpaRepository<UserFileRelation, UserFileRelationId> {

    List<UserFileRelation> findAllByUser(User user);

    boolean existsByUser(User user);
}
