package com.example.zipplz_be.domain.model.entity;

import com.example.zipplz_be.domain.user.entity.Worker;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Local {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="local_serial")
    private int localSerial;
    @ManyToOne
    @JoinColumn(name="user_serial")
    private Worker userSerial;
    @Column(name="sido_code")
    private int sidoCode;
    @Column(name="gugun_code")
    private int gugunCode;
    @Column(name="local_name")
    private String localName;
}
