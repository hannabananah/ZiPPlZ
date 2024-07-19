package com.example.zipplz_be.domain.user.domain;

import com.example.zipplz_be.domain.file.domain.File;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userSerial;
    @OneToOne
    @JoinColumn(name = "file_serial")
    private File fileSerial;
    private String email;
    private String password;
    private String userName;
    private int gender;
    private String tel;
    private int age;
}
