package com.example.zipplz_be.domain.user.entity;

import com.example.zipplz_be.domain.file.entity.File;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_serial")
    private int userSerial;     // 유저 연번
    @OneToOne
    @JoinColumn(name = "file_serial", nullable=true)
    private File fileSerial;
    private String email;       // 이메일
    private String password;    // 비밀번호
    @Column(name = "user_name")
    private String userName;    // 이름
    @Column(name = "birth_date")
    private Date birthDate;     // 나이
    private String tel;         // 전화번호
    @Column(name = "del_yn")
    private int delYN;          // 삭제된 유저인지 여부: 0이면 사용 중인 User, 1이면 삭제된 User
    @Column(name = "role")
    private String role;

    @Builder
    public User(String email, String password, String userName, Date birthDate, String tel) {
        this.email = email;
        this.password = password;
        this.userName = userName;
        this.birthDate = birthDate;
        this.tel = tel;
        this.fileSerial = null;
        this.delYN = 0; // 기본값으로 설정 (또는 필요에 따라 설정)
        this.role = "";
    }
}
