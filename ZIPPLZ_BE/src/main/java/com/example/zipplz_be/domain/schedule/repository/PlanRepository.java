package com.example.zipplz_be.domain.schedule.repository;

import com.example.zipplz_be.domain.schedule.entity.Plan;
import com.example.zipplz_be.domain.schedule.entity.Work;
import com.example.zipplz_be.domain.user.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanRepository extends JpaRepository<Plan, Integer> {
    List<Plan> findBycustomerSerial(Customer customerSerial);
    Plan findByPlanSerial(int planSerial);
    Plan findByCustomerSerialAndIsActive(Customer customer, int isActive);
}
