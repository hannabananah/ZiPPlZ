package com.example.zipplz_be.domain.model;

import com.example.zipplz_be.domain.board.domain.Board;
import com.example.zipplz_be.domain.user.domain.Customer;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@IdClass(BoardToWorkerId.class)
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardToWorker {
    @Id
    @ManyToOne
    @JoinColumn(name = "board_serial")
    private Board boardSerial;
    @Id
    @ManyToOne
    @JoinColumn(name = "worker_serial")
    private Customer workerSerial;
}
