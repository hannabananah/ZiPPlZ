package com.example.zipplz_be.domain.board.entity;

import com.example.zipplz_be.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentSerial;
    @ManyToOne
    @JoinColumn(name = "board_serial")
    private Board boardSerial;
    @ManyToOne
    @JoinColumn(name = "user_serial")
    private User userSerial;
    private String commentContent;
    private Date commentDate;
    private int parentCommentSerial;
    private int orderNumber;
    private int isDeleted;
}
