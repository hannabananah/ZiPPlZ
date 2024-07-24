package com.example.zipplz_be.domain.user.repository;

import com.example.zipplz_be.domain.user.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

}
