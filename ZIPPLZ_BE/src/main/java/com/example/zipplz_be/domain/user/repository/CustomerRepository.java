package com.example.zipplz_be.domain.user.repository;

import com.example.zipplz_be.domain.user.entity.Customer;
import com.example.zipplz_be.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Boolean existsByUserSerial(User userSerial);
    Customer findByUserSerial(User userSerial);
}
