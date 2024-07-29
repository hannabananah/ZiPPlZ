package com.example.zipplz_be.domain.model.repository;

import com.example.zipplz_be.domain.model.dto.GugunDTO;
import com.example.zipplz_be.domain.model.dto.SidoDTO;
import com.example.zipplz_be.domain.model.entity.Gugun;
import com.example.zipplz_be.domain.model.entity.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.*;

public interface LocalRepository extends JpaRepository<Local, Integer> {
    @Query(value="SELECT * " +
            "FROM Sido", nativeQuery = true)
    List<SidoDTO> getSidoList();

    @Query(value="SELECT * " +
            "FROM Gugun " +
            "WHERE sido_code = :sido_code", nativeQuery = true)
    List<GugunDTO> getGugunList(@Param("sido_code") int sido_code);

    @Query(value="SELECT local_name " +
            "FROM Local " +
            "WHERE Local.user_serial = :user_serial", nativeQuery = true)
    List<String> getLocalNames(@Param("user_serial") int user_serial);
}
