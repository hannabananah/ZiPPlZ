package com.example.zipplz_be.domain.model.repository;

import com.example.zipplz_be.domain.file.entity.File;
import com.example.zipplz_be.domain.model.PortfolioFileRelation;
import com.example.zipplz_be.domain.portfolio.entity.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioFileRelationRepository extends JpaRepository<PortfolioFileRelation,Integer> {

    PortfolioFileRelation findByPortfolioSerialAndFileSerial(Portfolio portfolioSerial, File fileSerial);
}
