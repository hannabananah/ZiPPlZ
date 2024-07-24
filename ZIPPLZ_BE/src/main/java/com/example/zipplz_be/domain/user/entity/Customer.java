package com.example.zipplz_be.domain.user.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Customer {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @OneToOne
    @JoinColumn(name = "customer_serial")
    private User customerSerial;
    private String nickname;
    @Column(name = "current_address")
    private String currentAddress;

    @Builder
    public Customer(User customerSerial, String nickname) {
        this.customerSerial = customerSerial;
        this.nickname = nickname;
    }
}
