package com.example.zipplz_be.domain.chatting.service;

import com.example.zipplz_be.domain.chatting.dto.ChatroomListDTO;
import com.example.zipplz_be.domain.chatting.dto.CreateChatroomDTO;
import com.example.zipplz_be.domain.chatting.entity.Chatroom;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ChatroomService {

    int createChatroom(int userSerial, CreateChatroomDTO createChatroomDTO);

    List<Chatroom> getChatroomList(int userSerial, String role, Pageable pageable);

}
