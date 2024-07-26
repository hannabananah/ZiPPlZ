package com.example.zipplz_be.domain.chatting.controller;

import com.example.zipplz_be.domain.chatting.dto.ChatMessageRequestDTO;
import com.example.zipplz_be.domain.chatting.service.ChatMessageService;
import com.example.zipplz_be.domain.user.dto.CustomUserDetails;
import com.example.zipplz_be.domain.user.jwt.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
public class ChatMessageController {

    private final ChatMessageService chatMessageService;
    private final JWTUtil jwtUtil;

    /*
     websocket "/app/chat/enter"로 들어오는 메시징을 처리한다.
     채팅방에 입장했을 경우
     */
    @MessageMapping("chat/enter")
    public void enter(ChatMessageRequestDTO chatMessageRequest, SimpMessageHeaderAccessor headerAccessor) {
        chatMessageService.enter(getUserSerial(headerAccessor), chatMessageRequest.getChatroomSerial());
    }

    /*
     websocket "/app/chat/message"로 들어오는 메시징을 처리한다.
     */
    @MessageMapping("/chat/message")
    public void message(ChatMessageRequestDTO chatMessageRequest, SimpMessageHeaderAccessor headerAccessor) {
        chatMessageService.sendMessage(chatMessageRequest, getUserSerial(headerAccessor));
    }

    public int getUserSerial(SimpMessageHeaderAccessor headerAccessor) {
        String token = headerAccessor.getFirstNativeHeader("X-AUTH-TOKEN");
        return jwtUtil.getUserSerialFromJwt(token);
    }
}
