package com.example.zipplz_be.domain.chatting.entity;

import com.example.zipplz_be.domain.user.entity.Customer;
import com.example.zipplz_be.domain.user.entity.Worker;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Getter
@Setter
public class Chatroom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="chatroom_serial")
    private int chatroomSerial;
    @ManyToOne
    @JoinColumn(name="customer_serial")
    private Customer customerSerial;
    @ManyToOne
    @JoinColumn(name="worker_serial")
    private Worker workerSerial;
    @Column(name="chatroom_name")
    private String chatroomName;
    @Column(name="chatroom_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp chatroomDate;
    @Column(name="session_id")
    private String sessionId;
}
