package com.example.zipplz_be.domain.file.repository;

import com.example.zipplz_be.domain.file.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FileRepository extends JpaRepository<File, Integer> {
    @Query(value="SELECT *", nativeQuery = true)
    String getImg(@Param("user_serial") int user_serial);

    @Query(value="SELECT file_serial " +
            "FROM PortfolioFileRelation pfr" +
            "WHERE pfr.portfolio_serial = :portfolio_serial " +
            "LIMIT 1", nativeQuery = true)
    int getFIleSerial(@Param("portfolio_serial") int portfolio_serial);
}
