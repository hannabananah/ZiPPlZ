package com.example.zipplz_be.domain.chatting.service;

import com.example.zipplz_be.domain.chatting.entity.Chatroom;
import com.example.zipplz_be.domain.chatting.repository.ChattingRepository;
import com.example.zipplz_be.domain.model.UserToChatroom;
import com.example.zipplz_be.domain.model.repository.UserToChatroomRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class OpenviduService {
    private final ChattingRepository chattingRepository;
    private final UserToChatroomRepository userToChatroomRepository;

    OpenviduService(ChattingRepository chattingRepository, UserToChatroomRepository userToChatroomRepository) {
        this.chattingRepository = chattingRepository;
        this.userToChatroomRepository = userToChatroomRepository;

    }

    @Transactional
    public boolean initializeSession(int chatroomSerial, String newSessionId) {
        Chatroom chatroom = chattingRepository.findBychatroomSerial(chatroomSerial);

        if(chatroom == null) return false;
        chatroom.setSessionId(newSessionId);
        chattingRepository.save(chatroom);
        return true;
    }


    @Transactional
    public void createConnection(String token,int userSerial, int chatroomSerial) {
        //1. 우선 해당 userSerial과 chatroomSerial을 갖는 객체가 있는지 찾는다.
        //2. 있다면, 업데이트
        //3. 없다면, 새로 생성

        UserToChatroom userToChatroom = userToChatroomRepository.findToken(chatroomSerial, userSerial);

        if(userToChatroom == null) {
            //새로 생성
            userToChatroomRepository.insertToken(token, userSerial, chatroomSerial);
        }
        else {
            //업데이트
            userToChatroomRepository.updateToken(token, userSerial, chatroomSerial);
        }

    }

    @Transactional
    public String deleteConnection(String sessionId, int userSerial) {
        Chatroom chatroom = chattingRepository.findBysessionId(sessionId);

        UserToChatroom userToChatroom = userToChatroomRepository.findToken(chatroom.getChatroomSerial(),userSerial);

        String token = userToChatroom.getToken();

        userToChatroomRepository.delete(userToChatroom);
        return token;
    }
}
