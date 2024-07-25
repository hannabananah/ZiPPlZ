package com.example.zipplz_be.domain.portfolio.repository;

import com.example.zipplz_be.domain.portfolio.dto.PortfolioJoinDTO;
import com.example.zipplz_be.domain.portfolio.entity.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.*;

public interface PortfolioRepository extends JpaRepository<Portfolio, Integer> {
    @Query(value = "SELECT p.portfolio_serial, p.worker_serial, u.user_name, u.birth_date, (c.communication_star+c.attitude_star+c.quality_star+c.professional_star)/4, p.career, p.field_id " +
            "FROM Portfolio p " +
            "LEFT JOIN User u on p.worker_serial = u.user_serial " +
            "LEFT JOIN CustomerReview c on c.portfolio_serial = p.portfolio_serial " +
            "LEFT JOIN PortfolioFileRelation pfr on pfr.portfolio_serial = p.portfolio_serial " +
            "LEFT JOIN File f on f.file_serial = pfr.file_serial", nativeQuery = true)
    List<PortfolioJoinDTO> getPortfolioJoins();

//    @Query(value = "SELECT p.portfolio_serial, p.worker_serial, u.user_name, u.birth_date, (c.communication_star+c.attitude_star+c.quality_star+c.professional_star)/4, p.career, p.field_id " +
//            "FROM Portfolio p " +
//            "LEFT JOIN User u on p.worker_serial = u.user_serial " +
//            "LEFT JOIN CustomerReview c on c.portfolio_serial = p.portfolio_serial " +
//            "LEFT JOIN PortfolioFileRelation pfr on pfr.portfolio_serial = p.portfolio_serial " +
//            "LEFT JOIN File f on f.file_serial = pfr.file_serial " +
//            "WHERE p.field_id = :field_code", nativeQuery = true)
//    List<PortfolioJoinDTO> getPortfolioJoinsByField(@Param("field_code") int field_code);
}
