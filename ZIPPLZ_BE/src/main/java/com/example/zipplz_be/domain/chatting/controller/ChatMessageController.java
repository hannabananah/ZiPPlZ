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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Controller
public class ChatMessageController {

    private final ChatMessageService chatMessageService;
    private final JWTUtil jwtUtil;

    /*
     websocket "/pub/chat/enter"로 들어오는 메시징을 처리한다.
     채팅방에 입장했을 경우
     */
    @MessageMapping("/chat/enter")
    public void enter(ChatMessageRequestDTO chatMessageRequest, SimpMessageHeaderAccessor headerAccessor) {
        System.out.println("!!!!!!!!!! entered !!!!!!!!!!!!!!!");
//        chatMessageService.enter(getUserSerial(headerAccessor), chatMessageRequest.getChatroomSerial());
        chatMessageService.enter(chatMessageRequest.getUserSerial(), chatMessageRequest.getChatroomSerial()); // 테스트용 (테스트는 헤더 인식 못함)
    }

    /*
     websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
     */
    @MessageMapping("/chat/message/{role}")
    public void message(ChatMessageRequestDTO chatMessageRequest, SimpMessageHeaderAccessor headerAccessor, @PathVariable String role, MultipartFile file) {
        System.out.println("!!!!!!!!! sendMessage !!!!!!!!!!!!!!");
//        chatMessageService.sendMessage(chatMessageRequest, getUserSerial(headerAccessor), getRole(headerAccessor));
        chatMessageService.sendMessage(chatMessageRequest, chatMessageRequest.getUserSerial(), role, file); // 테스트용 (테스트는 헤더 인식 못함)
    }

    public int getUserSerial(SimpMessageHeaderAccessor headerAccessor) {
        String token = headerAccessor.getFirstNativeHeader("X-AUTH-TOKEN");
        System.out.println("!!!!!!!!!X-AUTH-TOKEN!!!!!!!!!!" + token);

        Authentication authentication = jwtUtil.getAuthentication(token);
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        return customUserDetails.getUserSerial();
    }

    public String getRole(SimpMessageHeaderAccessor headerAccessor) {
        String token = headerAccessor.getFirstNativeHeader("X-AUTH-TOKEN");

        Authentication authentication = jwtUtil.getAuthentication(token);
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        return customUserDetails.getRole();
    }
}
