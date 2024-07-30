package com.example.zipplz_be.domain.Schedule.service;

import com.example.zipplz_be.domain.Schedule.entity.Plan;
import com.example.zipplz_be.domain.Schedule.entity.Work;
import com.example.zipplz_be.domain.Schedule.exception.CustomerNotFoundException;
import com.example.zipplz_be.domain.Schedule.repository.PlanRepository;
import com.example.zipplz_be.domain.user.entity.Customer;
import com.example.zipplz_be.domain.user.entity.User;
import com.example.zipplz_be.domain.user.repository.CustomerRepository;
import com.example.zipplz_be.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PlanService {

    private final PlanRepository planRepository;
    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;

    PlanService(PlanRepository planRepository, CustomerRepository customerRepository, UserRepository userRepository) {
        this.planRepository = planRepository;
        this.customerRepository= customerRepository;
        this.userRepository = userRepository;
    }
    @Transactional
    public List<Plan> getPlanService(int userSerial) {
        //주어진 userSerial로부터 User 객체를 찾고,
        User user = userRepository.findByUserSerial(userSerial);

        //해당 객체를 바탕으로 customer 테이블에서 검색해보기!!
        Customer customer = customerRepository.findByUserSerial(user);

        //여기서 null이면 고객이 아닌 것
        if(customer == null) {
            throw new CustomerNotFoundException("현재 유저는 고객이 아니거나 유효하지 않은 유저입니다.");
        }

        return planRepository.findBycustomerSerial(customer);
    }

}
