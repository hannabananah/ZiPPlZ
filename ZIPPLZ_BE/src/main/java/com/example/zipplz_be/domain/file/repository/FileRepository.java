package com.example.zipplz_be.domain.file.repository;

import com.example.zipplz_be.domain.file.entity.File;
import com.example.zipplz_be.domain.material.dto.MaterialFileDTO;
import com.example.zipplz_be.domain.portfolio.dto.PortfolioFileDTO;
import com.example.zipplz_be.domain.portfolio.dto.PortfolioUserDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.*;

public interface FileRepository extends JpaRepository<File, Integer> {
    @Query(value="SELECT * " +
            "FROM PortfolioFileRelation pfr " +
            "LEFT JOIN File f on f.file_serial = pfr.file_serial " +
            "WHERE portfolio_serial = :portfolio_serial", nativeQuery = true)
    List<PortfolioFileDTO> getImg(@Param("portfolio_serial") int portfolio_serial);

    @Query(value = "SELECT * " +
            "FROM MaterialFileRelation mfr " +
            "LEFT JOIN File f on f.file_serial = mfr.file_serial " +
            "WHERE material_serial = :material_serial", nativeQuery = true)
    List<MaterialFileDTO> getMaterialImg(@Param("material_serial") int material_serial);

    File findByFileSerial(int fileSerial);
}
