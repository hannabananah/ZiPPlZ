package com.example.zipplz_be.domain.model;

import com.example.zipplz_be.domain.file.entity.File;
import com.example.zipplz_be.domain.portfolio.entity.Portfolio;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@IdClass(PortfolioFileRelationId.class)
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioFileRelation {
    @Id
    @ManyToOne
    @JoinColumn(name="portfolio_serial")
    private Portfolio portfolioSerial;
    @Id
    @ManyToOne
    @JoinColumn(name="file_serial")
    private File fileSerial;
}
