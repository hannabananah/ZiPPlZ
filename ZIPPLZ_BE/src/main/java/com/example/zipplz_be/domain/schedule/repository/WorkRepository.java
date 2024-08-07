package com.example.zipplz_be.domain.schedule.repository;

import com.example.zipplz_be.domain.schedule.entity.Plan;
import com.example.zipplz_be.domain.schedule.entity.Work;
import com.example.zipplz_be.domain.user.entity.Worker;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface WorkRepository extends JpaRepository<Work, Integer> {
    Page<Work> findByPlanSerial(Plan planSerial, Pageable pageable);
    List<Work> findByPlanSerial(Plan planSerial);

    List<Work> findByWorkerSerial(Worker workerSerial);
    Work findByWorkSerial(int workSerial);
    Boolean existsByFieldNameAndPlanSerial(String fieldName, Plan planSerial);

    @Query(value="SELECT SUM(WORK_PRICE) FROM WORK WHERE PLAN_SERIAL = :planSerial", nativeQuery = true)
    Integer sumWorkPrice(@Param("planSerial") int planSerial);

    List<Work> findByPlanSerialAndFieldNameAndStatus(Plan plan, String fieldName, String awaiting);
}
