package com.example.zipplz_be.domain.portfolio.entity;

import com.example.zipplz_be.domain.user.entity.Customer;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_review_serial")
    private int customerReviewSerial;
    @ManyToOne
    @JoinColumn(name = "customer_serial")
    private Customer customerSerial;
    @ManyToOne
    @JoinColumn(name = "portfolio_serial")
    private Portfolio portfolioSerial;
    @Column(name = "customer_review_content")
    private String customerReviewContent;
    @Column(name = "customer_review_date")
    private Timestamp customerReviewDate;
    @Column(name = "communication_star")
    private int communicationStar;
    @Column(name = "attitude_star")
    private int attitudeStar;
    @Column(name = "quality_star")
    private int qualityStar;
    @Column(name = "professional_star")
    private int professionalStar;
    @Column(name = "is_visible")
    private int isVisible;
    @Column(name = "review_comment")
    private String reviewComment;


    @Builder
    public CustomerReview(Customer customer, Portfolio portfolio, String customerReviewContent, Timestamp customerReviewDate,
                          int communicationStar, int attitudeStar,int qualityStar,  int professionalStar, int isVisible ) {
        this.customerSerial = customer;
        this.portfolioSerial = portfolio;
        this.customerReviewContent = customerReviewContent;
        this.customerReviewDate = customerReviewDate;
        this.communicationStar = communicationStar;
        this.attitudeStar = attitudeStar;
        this.qualityStar = qualityStar;
        this.professionalStar = professionalStar;
        this.isVisible = isVisible;
    }
}