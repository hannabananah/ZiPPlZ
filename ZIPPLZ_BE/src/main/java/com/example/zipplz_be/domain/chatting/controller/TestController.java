package com.example.zipplz_be.domain.chatting.controller;

import com.example.zipplz_be.domain.chatting.dto.ChatMessageRequestDTO;
import com.example.zipplz_be.domain.chatting.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class TestController {

    private final ChatMessageService chatMessageService;

    @PostMapping("/test/message")
    public void message(@RequestBody ChatMessageRequestDTO chatMessageRequest) {
        chatMessageService.saveMessage(chatMessageRequest);
    }
}
