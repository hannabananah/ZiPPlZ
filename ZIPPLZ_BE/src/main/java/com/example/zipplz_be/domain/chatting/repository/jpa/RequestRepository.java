package com.example.zipplz_be.domain.chatting.repository.jpa;

import com.example.zipplz_be.domain.chatting.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestRepository extends JpaRepository<Request, Integer> {
    Request findByRequestSerial(int requestSerial);

}
