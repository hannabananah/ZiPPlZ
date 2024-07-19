package com.example.zipplz_be.domain.user.domain;

import com.example.zipplz_be.domain.board.domain.Board;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Customer {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @OneToOne
    @JoinColumn(name = "customer_serial")
    private User customerSerial;
    private String nickname;
    private String currentAddress;
    @OneToMany(mappedBy = "customer_serial")
    private List<Board> posts;
}
