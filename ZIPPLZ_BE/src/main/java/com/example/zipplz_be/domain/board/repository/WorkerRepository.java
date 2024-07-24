package com.example.zipplz_be.domain.board.repository;

import com.example.zipplz_be.domain.user.entity.Worker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkerRepository extends JpaRepository<Worker, Integer> {
    @Query(value = "CREATE TEMPORATY TABLE temp_user(user_serial int, user_name varchar(45), birth_date DATE, INDEX(user_serial))"
            +"AS SELECT user_name, birth_date"
            +"FROM user", nativeQuery = true)
    void createTempUserTable();

    @Query(value = "CREATE TEMPORATY TABLE temp_portfolio(worker_serial int, career double, field_id int, INDEX(worker_serial))"
            +"AS SELECT career, field_id"
            +"FROM portfolio", nativeQuery = true)
    void createTempPortfolioTable();

    @Query(value = "CREATE TEMPORATY TABLE temp_worker(worker_serial int, location int, field_id int, INDEX(worker_serial))"
            +"AS SELECT career, field_id"
            +"FROM worker", nativeQuery = true)
    void createTempWorkerTable();
}
