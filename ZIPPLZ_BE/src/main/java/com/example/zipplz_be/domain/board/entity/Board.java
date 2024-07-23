package com.example.zipplz_be.domain.board.entity;

import com.example.zipplz_be.domain.user.entity.Customer;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="board_serial")
    private int boardSerial;
    @ManyToOne
    @JoinColumn(name="customer_serial")
    private Customer customerSerial;
    @Column(name="board_type")
    private String boardType;
    private String title;
    @Column(name="board_content")
    private String boardContent;
    @Column(name="board_date")
    private Date boardDate;
    private int hit;
}
