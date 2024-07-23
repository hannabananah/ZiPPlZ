package com.example.zipplz_be.domain.chatting.entity;

import com.example.zipplz_be.domain.user.entity.Customer;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Entity
@Getter
@Setter
public class Chatroom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int chatroomSerial;

    @JoinColumn(name="customer_serial")
    private Customer customerSerial;
    @JoinColumn(name="worker_serial")
    private int workerSerial;

    @Column(name="chatroom_name")
    private String chatroomName;

    @Column(name="chatroom_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date chatroomDate;

    @Column(name="session_id")
    private String sessionId;

}
