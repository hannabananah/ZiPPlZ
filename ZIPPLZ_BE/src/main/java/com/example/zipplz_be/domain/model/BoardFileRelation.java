package com.example.zipplz_be.domain.model;

import com.example.zipplz_be.domain.board.entity.Board;
import com.example.zipplz_be.domain.file.entity.File;
import com.example.zipplz_be.domain.material.entity.Material;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@IdClass(BoardFileRelationId.class)
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardFileRelation {
    @Id
    @ManyToOne
    @JoinColumn(name="board_serial")
    private Board boardSerial;
    @Id
    @ManyToOne
    @JoinColumn(name="file_serial")
    private File fileSerial;
}
