package com.example.zipplz_be.domain.chatting.controller;

import com.example.zipplz_be.domain.chatting.dto.CreateChatroomDTO;
import com.example.zipplz_be.domain.chatting.dto.CreateChatroomResponseDTO;
import com.example.zipplz_be.domain.chatting.service.ChatroomService;
import com.example.zipplz_be.domain.user.dto.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
//@RequestMapping("/chatroom")
public class ChatroomController {

    private final ChatroomService chatroomService;

    @PostMapping("/chatroom")
    public ResponseEntity createChatroom(Authentication authentication, @RequestBody CreateChatroomDTO createChatroomDTO) {

        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        int userSerial = customUserDetails.getUserSerial();
        System.out.println("userSerial from createChatroom in ChatroomController : " + userSerial);
        int chatroomSerial = chatroomService.createChatroom(userSerial, createChatroomDTO);

        CreateChatroomResponseDTO createChatroomResponseDTO = CreateChatroomResponseDTO.builder().chatroomSerial(chatroomSerial).build();

        return ResponseEntity.ok(createChatroomResponseDTO);
    }
}
