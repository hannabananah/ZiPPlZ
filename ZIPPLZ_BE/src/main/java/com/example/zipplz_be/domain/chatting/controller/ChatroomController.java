package com.example.zipplz_be.domain.chatting.controller;

import com.example.zipplz_be.domain.chatting.dto.CreateChatroomDTO;
import com.example.zipplz_be.domain.chatting.dto.CreateChatroomResponseDTO;
import com.example.zipplz_be.domain.chatting.entity.Chatroom;
import com.example.zipplz_be.domain.chatting.service.ChatroomService;
import com.example.zipplz_be.domain.model.dto.ResponseDTO;
import com.example.zipplz_be.domain.user.dto.CustomUserDetails;
import com.example.zipplz_be.domain.user.dto.JoinResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chatroom")
public class ChatroomController {

    private final ChatroomService chatroomService;

    @PostMapping("")
    public ResponseEntity createChatroom(Authentication authentication, @RequestBody CreateChatroomDTO createChatroomDTO) {

        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        int userSerial = customUserDetails.getUserSerial();
        System.out.println("userSerial from createChatroom in ChatroomController : " + userSerial);
        int chatroomSerial = chatroomService.createChatroom(userSerial, createChatroomDTO);

        CreateChatroomResponseDTO createChatroomResponseDTO = CreateChatroomResponseDTO.builder().chatroomSerial(chatroomSerial).build();

        return ResponseEntity.ok(createChatroomResponseDTO);
    }

    @GetMapping("")
    public ResponseEntity getChatroomList(Authentication authentication, Pageable pageable) {
        ResponseDTO responseDTO;
        HttpStatus status;

        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        int userSerial = customUserDetails.getUserSerial();
        String role = customUserDetails.getRole();

        try {
            List<Chatroom> chatroomList = chatroomService.getChatroomList(userSerial, role, pageable);
            if (userSerial == -1) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "채팅방 목록 조회 실패");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "채팅방 목록 조회 성공", chatroomList);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }
}
