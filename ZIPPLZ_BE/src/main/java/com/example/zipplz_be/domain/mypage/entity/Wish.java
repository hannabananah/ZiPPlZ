package com.example.zipplz_be.domain.mypage.entity;

import com.example.zipplz_be.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Wish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="wish_list_serial")
    private int wishListSerial;
    @ManyToOne
    @JoinColumn(name="user_serial")
    private User userSerial;
    @Column(name="wish_type")
    private int wishType;
    @Column(name="wish_serial")
    private int wishSerial;
}
