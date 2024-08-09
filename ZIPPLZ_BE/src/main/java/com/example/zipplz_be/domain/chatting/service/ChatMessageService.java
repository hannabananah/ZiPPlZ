package com.example.zipplz_be.domain.chatting.service;

import com.example.zipplz_be.domain.chatting.dto.ChatMessageRequestDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
public interface ChatMessageService {

    void sendMessage(ChatMessageRequestDTO chatMessageRequestDTO, int userSerial, String role);

    void enter(int userSerial, int chatroomSerial);
}
