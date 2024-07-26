package com.example.zipplz_be.domain.user.repository;

import com.example.zipplz_be.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Boolean existsByEmail(String email);
    User findByUserSerial(int userSerial);
        // email을 받아 DB 테이블에서 유저를 조회하는 메소드
    User findByEmail(String email);
}
