package com.example.zipplz_be.domain.chatting.controller;

import com.example.zipplz_be.domain.chatting.dto.ChatMessageRequestDTO;
import com.example.zipplz_be.domain.chatting.exception.InvalidTokenException;
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
        System.out.println("!!!!!!!!!! entered !!!!!!!!!!!!!!!1");
//        chatMessageService.enter(getUserSerial(headerAccessor), chatMessageRequest.getChatroomSerial());
        chatMessageService.enter(chatMessageRequest.getUserSerial(), chatMessageRequest.getChatroomSerial());
    }

    /*
     websocket "/app/chat/message"로 들어오는 메시징을 처리한다.
     */
    @MessageMapping("/chat/message")
    public void message(ChatMessageRequestDTO chatMessageRequest, SimpMessageHeaderAccessor headerAccessor) {
        System.out.println("!!!!!!!!! sendMessage !!!!!!!!!!!!!!");
//        chatMessageService.sendMessage(chatMessageRequest, getUserSerial(headerAccessor));
        chatMessageService.sendMessage(chatMessageRequest, chatMessageRequest.getUserSerial());
    }

    public int getUserSerial(SimpMessageHeaderAccessor headerAccessor) {
        String authorization = headerAccessor.getFirstNativeHeader("Authorization");

        // Authorization 헤더 검증
        if (authorization == null || !authorization.startsWith("Bearer ")) {

            throw new InvalidTokenException("해당 토큰이 유효하지 않습니다.");
        }

        String token = authorization.split(" ")[1];

        System.out.println("!!!!!!!!!!! token => " + token);

        return jwtUtil.getUserSerialFromJwt(token);
    }
}
