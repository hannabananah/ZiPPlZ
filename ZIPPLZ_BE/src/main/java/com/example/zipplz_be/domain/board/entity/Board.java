package com.example.zipplz_be.domain.board.entity;

import com.example.zipplz_be.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

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
    @JoinColumn(name="user_serial")
    private User userSerial;
    @Column(name="board_type")
    private String boardType;
    private String title;
    @Column(name="board_content")
    private String boardContent;
    @Column(name="board_date")
    private LocalDateTime boardDate;
    private int hit;
}
