package com.example.zipplz_be.domain.user.repository;

import com.example.zipplz_be.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    Boolean existsByEmail(String email);
    User findByUserSerial(int userSerial);
}
