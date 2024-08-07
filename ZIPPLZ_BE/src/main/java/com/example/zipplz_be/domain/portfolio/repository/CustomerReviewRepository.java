package com.example.zipplz_be.domain.portfolio.repository;

import com.example.zipplz_be.domain.portfolio.entity.CustomerReview;
import com.example.zipplz_be.domain.portfolio.entity.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerReviewRepository extends JpaRepository<CustomerReview, Integer> {
    List<CustomerReview> findAllByPortfolioSerial(Portfolio portfolio);
}
