package com.example.zipplz_be.domain.chatting.repository;

import com.example.zipplz_be.domain.chatting.entity.Chatroom;
import com.example.zipplz_be.domain.chatting.entity.RecordingFile;
import io.openvidu.java.client.Recording;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecordingFileRepository extends JpaRepository<RecordingFile, Integer> {
    RecordingFile findByRecordingId(String recordingId);
    List<RecordingFile> findByChatroomSerial(Chatroom chatroomSerial);

    void deleteByRecordingId(String recordingId);
}
