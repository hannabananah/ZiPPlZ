package com.example.zipplz_be.domain.Schedule.entity;

import com.example.zipplz_be.domain.user.entity.Customer;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Plan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="plan_serial")
    int planSerial;

    @ManyToOne
    @JoinColumn(name="customer_serial")
    Customer customerSerial;
    @Column(name="address")
    String address;
    @Column(name="shared_contents")
    String sharedContents;
}
