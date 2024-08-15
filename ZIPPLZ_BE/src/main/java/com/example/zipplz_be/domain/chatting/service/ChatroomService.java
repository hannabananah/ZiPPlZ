package com.example.zipplz_be.domain.chatting.service;

import com.example.zipplz_be.domain.chatting.dto.ChatMessageResponseDTO;
import com.example.zipplz_be.domain.chatting.dto.ChatroomDetailDTO;
import com.example.zipplz_be.domain.chatting.dto.ChatroomListDTO;
import com.example.zipplz_be.domain.chatting.dto.CreateChatroomDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ChatroomService {

    int createChatroom(int userSerial, CreateChatroomDTO createChatroomDTO);

    List<ChatroomListDTO> getChatroomList(int userSerial, String role, Pageable pageable);

    ChatroomDetailDTO getChatroomDetail(int chatroomSerial, int userSerial);

    String getOtherUserName(int chatroomSerial, int userSerial);

    List<ChatMessageResponseDTO> getPreviousMessage(int chatroomSerial, int userSerial);

    void deleteChatroom(int chatroomSerial, int userSerial);
}
