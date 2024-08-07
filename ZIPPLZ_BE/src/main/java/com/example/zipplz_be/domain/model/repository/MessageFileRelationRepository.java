package com.example.zipplz_be.domain.model.repository;

import com.example.zipplz_be.domain.model.MessageFileRelation;
import com.example.zipplz_be.domain.model.MessageFileRelationId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageFileRelationRepository extends JpaRepository<MessageFileRelation, MessageFileRelationId> {
    MessageFileRelation findByMessageId(String messageId);
}
