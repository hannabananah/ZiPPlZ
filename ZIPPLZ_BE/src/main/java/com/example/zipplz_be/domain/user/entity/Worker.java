package com.example.zipplz_be.domain.user.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Worker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "worker_serial")
    private int workerSerial;
    @OneToOne
    @JoinColumn(name = "user_serial")
    private User userSerial;
    private int location;
    private String company;
    @Column(name = "company_address")
    private String companyAddress;
    @Column(name = "business_number")
    private String businessNumber;
    private String certificate;
    @Column(name = "has_as_badge")
    private int hasAsBadge;
}