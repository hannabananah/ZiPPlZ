package com.example.zipplz_be.domain.user.repository;

import com.example.zipplz_be.domain.user.entity.Worker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkerRepository extends JpaRepository<Worker, Integer> {
    List<Worker> findAll();
}
