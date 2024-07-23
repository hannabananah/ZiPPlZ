package com.example.zipplz_be.domain.user.service;

import com.example.zipplz_be.domain.user.dto.JoinDTO;
import com.example.zipplz_be.domain.user.entity.User;
import com.example.zipplz_be.domain.user.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JoinService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public JoinService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public int joinProcess(JoinDTO joinDTO) {

        String email = joinDTO.getEmail();

        Boolean isExist = userRepository.existsByEmail(email);

        if (isExist) {
            return -1;
        }

        String password = joinDTO.getPassword();
        joinDTO.setPassword(bCryptPasswordEncoder.encode(password));
        User user = userRepository.save(joinDTO.toEntity());
        System.out.println(user.getUserSerial());

        return user.getUserSerial();
    }
}
