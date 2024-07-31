package com.example.zipplz_be.domain.chatting.entity;

import com.example.zipplz_be.domain.user.entity.Customer;
import com.example.zipplz_be.domain.user.entity.User;
import com.example.zipplz_be.domain.user.entity.Worker;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Chatroom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="chatroom_serial")
    private int chatroomSerial;
    @ManyToOne
    @JoinColumn(name="c_user_serial")
    private User cUserSerial;
    @ManyToOne
    @JoinColumn(name="w_user_serial")
    private User wUserSerial;
    @Column(name="chatroom_name")
    private String chatroomName;
    @Column(name="chatroom_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp chatroomDate;
    @Column(name="session_id")
    private String sessionId;

    @Builder
    Chatroom(User cUserSerial, User wUserSerial) {
        this.cUserSerial = cUserSerial;
        this.wUserSerial = wUserSerial;
    }
}
