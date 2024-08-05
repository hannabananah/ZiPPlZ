package com.example.zipplz_be.domain.chatting.controller;

import com.example.zipplz_be.domain.chatting.dto.ChatMessageResponseDTO;
import com.example.zipplz_be.domain.chatting.dto.ChatroomListDTO;
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
    public ResponseEntity<ResponseDTO> createChatroom(Authentication authentication, @RequestBody CreateChatroomDTO createChatroomDTO) {

        ResponseDTO responseDTO;
        HttpStatus status;

        try {
            int userSerial = getUserSerial(authentication);
            int chatroomSerial = chatroomService.createChatroom(userSerial, createChatroomDTO);
            if (chatroomSerial < 0) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "채팅방 생성 실패");
            } else {
                status = HttpStatus.OK;
                CreateChatroomResponseDTO createChatroomResponseDTO = CreateChatroomResponseDTO.builder().chatroomSerial(chatroomSerial).build();
                responseDTO = new ResponseDTO<>(status.value(), "채팅방 생성 성공", createChatroomResponseDTO);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }

    @GetMapping("")
    public ResponseEntity<ResponseDTO> getChatroomList(Authentication authentication, Pageable pageable) {

        ResponseDTO responseDTO;
        HttpStatus status;
        try {
            List<ChatroomListDTO> chatroomList = chatroomService.getChatroomList(getUserSerial(authentication), getUserRole(authentication), pageable);
            if (chatroomList == null) {
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

    @GetMapping("/{chatroomSerial}")
    public ResponseEntity getMessage(Authentication authentication, @PathVariable int chatroomSerial) {
        ResponseDTO responseDTO;
        HttpStatus status;
        try {
            List<ChatMessageResponseDTO> previousMessages = chatroomService.getPreviousMessage(chatroomSerial, getUserSerial(authentication));
            if (previousMessages == null) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "메세지들 조회 실패");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "메세지들 조회 성공", previousMessages);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }

    @PatchMapping("/{chatroomSerial}")
    public ResponseEntity deleteChatRoom(Authentication authentication, @PathVariable int chatroomSerial) {
        chatroomService.deleteChatroom(chatroomSerial, getUserSerial(authentication));
        return ResponseEntity.ok().build();
    }

    public int getUserSerial(Authentication authentication) {
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        return customUserDetails.getUserSerial();
    }

    public String getUserRole(Authentication authentication) {
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        return customUserDetails.getRole();
    }
}
