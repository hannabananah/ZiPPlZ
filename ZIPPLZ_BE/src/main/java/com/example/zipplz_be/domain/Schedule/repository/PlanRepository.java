package com.example.zipplz_be.domain.Schedule.repository;

import com.example.zipplz_be.domain.Schedule.entity.Plan;
import com.example.zipplz_be.domain.chatting.entity.Chatroom;
import com.example.zipplz_be.domain.user.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanRepository extends JpaRepository<Plan, Integer> {
    List<Plan> findBycustomerSerial(Customer customerSerial);

}
