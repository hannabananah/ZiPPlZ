package com.example.zipplz_be.domain.Schedule.service;

import com.example.zipplz_be.domain.Schedule.entity.Plan;
import com.example.zipplz_be.domain.Schedule.repository.PlanRepository;
import com.example.zipplz_be.domain.user.entity.Customer;
import com.example.zipplz_be.domain.user.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanService {

    private final PlanRepository planRepository;
    private final CustomerRepository customerRepository;

    PlanService(PlanRepository planRepository, CustomerRepository customerRepository) {
        this.planRepository = planRepository;
        this.customerRepository= customerRepository;
    }

    public List<Plan> getPlanService(int customerSerial) {
        //customer serial을 customer 테이블에서 검색해보기!!
        Customer customer = customerRepository.findByCustomerSerial(customerSerial);

        return planRepository.findBycustomerSerial(customer);
    }
}
