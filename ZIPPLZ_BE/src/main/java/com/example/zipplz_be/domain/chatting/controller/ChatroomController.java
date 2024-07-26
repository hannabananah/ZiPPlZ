package com.example.zipplz_be.domain.chatting.controller;

import com.example.zipplz_be.domain.chatting.dto.CreateChatroomDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chatroom")
public class ChatroomController {

    @PostMapping("")
    public ResponseEntity createChatRoom(Authentication authentication, @RequestBody CreateChatroomDTO crerateChatroomDTO) {
        return ResponseEntity.ok(createResponseChatRoomDTO);
    }
}
