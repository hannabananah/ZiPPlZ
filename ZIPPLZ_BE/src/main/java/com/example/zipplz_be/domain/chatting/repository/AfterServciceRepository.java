package com.example.zipplz_be.domain.chatting.repository;

import com.example.zipplz_be.domain.Schedule.entity.Work;
import com.example.zipplz_be.domain.chatting.entity.AfterService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface AfterServciceRepository extends JpaRepository<AfterService,Integer>{
    Page<AfterService> findByWorkSerial(Work work, Pageable pageable);

}
