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
    private int customerReviewSerial;
    @ManyToOne
    @JoinColumn(name = "customer_serial")
    private Customer customerSerial;
    @ManyToOne
    @JoinColumn(name = "portfolio_serial")
    private Portfolio portfolioSerial;
    private String customerReviewContent;
    private Date customerReviewDate;
    private double communicationStar;
    private double attitudeStar;
    private double qualityStar;
    private double professionalStar;
    private int isVisible;
    private String reviewComment;
}