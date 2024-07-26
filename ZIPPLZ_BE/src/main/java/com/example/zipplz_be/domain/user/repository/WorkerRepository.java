package com.example.zipplz_be.domain.user.repository;

import com.example.zipplz_be.domain.user.entity.User;
import com.example.zipplz_be.domain.user.entity.Worker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkerRepository extends JpaRepository<Worker, Integer> {
    Boolean existsByUserSerial(User userSerial);
}
