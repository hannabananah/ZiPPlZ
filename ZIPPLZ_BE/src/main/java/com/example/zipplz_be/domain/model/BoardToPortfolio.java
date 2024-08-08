package com.example.zipplz_be.domain.model;

import com.example.zipplz_be.domain.board.entity.Board;
import com.example.zipplz_be.domain.portfolio.entity.Portfolio;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@IdClass(BoardToPortfolioId.class)
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardToPortfolio {
    @Id
    @ManyToOne
    @JoinColumn(name = "board_serial")
    private Board boardSerial;
    @Id
    @ManyToOne
    @JoinColumn(name = "portfolio_serial")
    private Portfolio portfolioSerial;
}