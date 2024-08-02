package com.example.zipplz_be.domain.portfolio.repository;

import com.example.zipplz_be.domain.portfolio.entity.CustomerReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerReviewRepository extends JpaRepository<CustomerReview, Integer> {

}
