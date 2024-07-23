package com.example.zipplz_be.domain.portfolio.entity;

import com.example.zipplz_be.domain.user.entity.Customer;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;

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
    private Date customerReviewDate;
    @Column(name = "communication_star")
    private double communicationStar;
    @Column(name = "attitude_star")
    private double attitudeStar;
    @Column(name = "quality_star")
    private double qualityStar;
    @Column(name = "professional_star")
    private double professionalStar;
    @Column(name = "is_visible")
    private int isVisible;
    @Column(name = "review_comment")
    private String reviewComment;
}