package com.example.zipplz_be.domain.portfolio.repository;

import com.example.zipplz_be.domain.portfolio.entity.CustomerReview;
import com.example.zipplz_be.domain.portfolio.entity.Portfolio;
import com.example.zipplz_be.domain.schedule.entity.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerReviewRepository extends JpaRepository<CustomerReview, Integer> {
    List<CustomerReview> findAllByPortfolioSerial(Portfolio portfolio);
    CustomerReview findByCustomerReviewSerial(int customerReviewSerial);
    CustomerReview findByWorkSerial(Work work);

}
