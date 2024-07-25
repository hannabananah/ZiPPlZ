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
    @Column(name = "comment_serial")
    private int commentSerial;
    @ManyToOne
    @JoinColumn(name = "board_serial")
    private Board boardSerial;
    @ManyToOne
    @JoinColumn(name = "user_serial")
    private User userSerial;
    @Column(name = "comment_content")
    private String commentContent;
    @Column(name = "comment_date")
    private Date commentDate;
    @Column(name = "parent_comment_serial")
    private int parentCommentSerial;
    @Column(name = "order_number")
    private int orderNumber;
    @Column(name = "is_deleted")
    private int isDeleted;
}
