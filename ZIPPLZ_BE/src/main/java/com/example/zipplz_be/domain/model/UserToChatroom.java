package com.example.zipplz_be.domain.model;

import com.example.zipplz_be.domain.user.entity.User;
import com.example.zipplz_be.domain.chatting.entity.Chatroom;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@IdClass(UserToChatroom.class)
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserToChatroom {
    @Id
    @ManyToOne
    @JoinColumn(name= "chatroom_serial")
    private Chatroom chatroomSerial;

    @Id
    @ManyToOne
    @JoinColumn(name = "user_serial")
    private User userSerial;

    private String token;

}
