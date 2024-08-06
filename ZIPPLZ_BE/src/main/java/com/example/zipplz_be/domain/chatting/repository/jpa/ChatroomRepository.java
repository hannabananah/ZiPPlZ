package com.example.zipplz_be.domain.chatting.repository.jpa;

import com.example.zipplz_be.domain.chatting.entity.Chatroom;
import com.example.zipplz_be.domain.model.entity.Status;
import com.example.zipplz_be.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface ChatroomRepository extends JpaRepository<Chatroom, Integer> {
    Chatroom findByChatroomSerial(int chatroomSerial);
    Chatroom findByChatroomSerialAndStatus(int chatroomSerial, Status active);

    Chatroom findBySessionId(String sessionId);

    Boolean existsByChatroomSerialAndStatus(int chatroomSerial, Status active);

    // 엔티티 필드에 맞는 메소드 정의
    Boolean existsByStatusAndCuserAndWuser(Status status, User cuser, User wuser);

    Chatroom findByCuserAndWuserAndStatus(User cuser, User wuser, Status active);

    Page<Chatroom> findAllByCuserAndStatus(User cuser, Status active, Pageable pageable);

    Page<Chatroom> findAllByWuserAndStatus(User wuser, Status active, Pageable pageable);
}
