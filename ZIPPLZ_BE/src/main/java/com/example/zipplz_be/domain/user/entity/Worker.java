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
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @OneToOne
    @JoinColumn(name = "worker_serial")
    private User workerSerial;
    private int specialty;
    private int location;
    private String company;
    private String certificate;
    @Column(name = "has_as_badge")
    private int hasAsBadge;
}
