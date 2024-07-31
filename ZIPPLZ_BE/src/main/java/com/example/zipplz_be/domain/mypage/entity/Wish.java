package com.example.zipplz_be.domain.mypage.entity;

import com.example.zipplz_be.domain.mypage.WishId;
import com.example.zipplz_be.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@IdClass(WishId.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Wish {
    @Id
    @ManyToOne
    @JoinColumn(name="user_serial")
    private User userSerial;
    @Id
    @Column(name="wish_type")
    private int wishType;
    @Id
    @Column(name="wish_serial")
    private int wishSerial;
}
