package com.example.zipplz_be.domain.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ShowBoardListDTO {
    int board_serial;
    int board_type;
    int user_serial;
    String img;
    String title;
    String nickname;
    LocalDateTime board_date;
    int hit;
    int comment_cnt;
    int wish_cnt;

    public ShowBoardListDTO(BoardJoinDTO bjd, String img, int comment_cnt, int wish_cnt) {
        this.board_serial = bjd.getBoardSerial();
        this.board_type = bjd.getBoardType();
        this.user_serial = bjd.getUserSerial();
        this.title = bjd.getTitle();
        this.nickname = bjd.getNickname();
        this.board_date = bjd.getBoardDate();
        this.hit = bjd.getHit();
        this.img = img;
        this.comment_cnt = comment_cnt;
        this.wish_cnt = wish_cnt;
    }
}
