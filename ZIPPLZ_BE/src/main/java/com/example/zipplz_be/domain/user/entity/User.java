package com.example.zipplz_be.domain.user.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_serial")
    private int userSerial;     // 유저 연번
    private String email;       // 이메일
    private String password;    // 비밀번호
    private String userName;    // 이름
    private Date birthDate;     // 나이
    private String tel;         // 전화번호
    @Column(name = "del_yn")
    private int delYN;          // 삭제된 유저인지 여부: 0이면 사용 중인 User, 1이면 삭제된 User
}
