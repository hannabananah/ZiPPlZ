package com.example.zipplz_be.domain.chatting.repository.jpa;

import com.example.zipplz_be.domain.chatting.entity.Request;
import com.example.zipplz_be.domain.schedule.entity.Work;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<Request, Integer> {
    Request findByRequestSerial(int requestSerial);

    Page<Request> findByWorkSerialAndRequestStatusOrderByRequestDateDesc(Work work, String accepted, Pageable pageable);

    List<Request> findByWorkSerial(Work originalWork);
}
