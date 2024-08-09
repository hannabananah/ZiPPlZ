package com.example.zipplz_be.domain.user.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_serial")
    private int customerSerial;
    @OneToOne
    @JoinColumn(name = "user_serial")
    private User userSerial;
    private String nickname;
    @Column(name = "current_address")
    private String currentAddress;

    @Builder
    public Customer(User userSerial, String nickname) {
        this.userSerial = userSerial;
        this.nickname = nickname;
    }
}