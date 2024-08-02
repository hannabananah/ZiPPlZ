package com.example.zipplz_be.domain.file.repository;

import com.example.zipplz_be.domain.file.entity.File;
import com.example.zipplz_be.domain.portfolio.dto.PortfolioFileDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.*;

public interface FileRepository extends JpaRepository<File, Integer> {
    @Query(value="SELECT * " +
            "FROM PortfolioFileRelation pfr " +
            "LEFT JOIN File f on f.file_serial = pfr.file_serial " +
            "WHERE portfolio_serial = :portfolio_serial " +
            "LIMIT 1", nativeQuery = true)
    List<PortfolioFileDTO> getImg(@Param("portfolio_serial") int portfolio_serial);
}
