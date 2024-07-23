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
    private int boardSerial;
    @ManyToOne
    @JoinColumn(name="customer_serial")
    private Customer customerSerial;
    private String boardType;
    private String title;
    private String boardContent;
    private Date boardDate;
    private int hit;
}
