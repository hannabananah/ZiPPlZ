package com.example.zipplz_be.domain.chatting.service;

import com.example.zipplz_be.domain.chatting.dto.CreateChatroomDTO;
import org.springframework.stereotype.Service;

@Service
public interface ChatroomService {

    int createChatroom(int userSerial, CreateChatroomDTO createChatroomDTO);

}
