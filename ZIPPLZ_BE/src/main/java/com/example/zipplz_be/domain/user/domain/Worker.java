package com.example.zipplz_be.domain.user.domain;

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
    private int hasAsBadge;
}
