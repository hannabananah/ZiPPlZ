package com.example.zipplz_be.domain.chatting.repository.jpa;

import com.example.zipplz_be.domain.chatting.entity.Chatroom;
import com.example.zipplz_be.domain.user.entity.User;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface ChatroomRepository extends JpaRepository<Chatroom, Integer> {
    Chatroom findByChatroomSerial(int chatroomSerial);

    Chatroom findBySessionId(String sessionId);

    Boolean existsByChatroomSerial(int chatroomSerial);

    // 엔티티 필드에 맞는 메소드 정의
    Boolean existsByCuserAndWuser(User cuser, User wuser);

    Chatroom findByCuserAndWuser(User cuser, User wuser);

    List<Chatroom> findAllByCuser(User cuser);

    List<Chatroom> findAllByWuser(User wuser);
}
