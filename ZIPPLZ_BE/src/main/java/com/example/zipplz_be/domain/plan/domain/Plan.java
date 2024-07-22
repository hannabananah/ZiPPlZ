package com.example.zipplz_be.domain.plan.domain;

import com.example.zipplz_be.domain.user.domain.Customer;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Plan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int planSerial;
    @ManyToOne
    @JoinColumn(name = "customer_serial")
    private Customer customerSerial;
    private String address;
    private String sharedContents;
}
