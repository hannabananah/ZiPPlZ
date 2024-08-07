package com.example.zipplz_be.domain.model;

import com.example.zipplz_be.domain.file.entity.File;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@IdClass(MessageFileRelationId.class)
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MessageFileRelation {
    @Id
    @Column(name = "message_id")
    private String messageId;
    @Id
    @ManyToOne
    @JoinColumn(name = "file")
    private File file;
}
