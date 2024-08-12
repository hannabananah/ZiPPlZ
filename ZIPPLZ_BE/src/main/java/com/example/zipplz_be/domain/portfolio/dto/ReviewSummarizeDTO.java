package com.example.zipplz_be.domain.portfolio.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ReviewSummarizeDTO {
    String goodReview;
    String badReview;
}
