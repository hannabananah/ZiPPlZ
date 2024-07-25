package com.example.zipplz_be.domain.user.service;

import com.example.zipplz_be.domain.user.dto.InsertCustomerDTO;
import com.example.zipplz_be.domain.user.dto.JoinDTO;
import com.example.zipplz_be.domain.user.entity.Customer;
import com.example.zipplz_be.domain.user.entity.User;
import com.example.zipplz_be.domain.user.repository.CustomerRepository;
import com.example.zipplz_be.domain.user.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JoinService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final CustomerRepository customerRepository;

    public JoinService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, CustomerRepository customerRepository) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.customerRepository = customerRepository;
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

    public boolean insertCustomerInfo(InsertCustomerDTO insertCustomerDTO) {

        int userSerial = insertCustomerDTO.getUserSerial();
        User user = userRepository.findByUserSerial(userSerial);
        if (user == null) {
            return false; // 유저가 존재하지 않는 경우
        }
        String nickname = insertCustomerDTO.getNickname();

        Customer customer = Customer.builder()
                .customerSerial(user)
                .nickname(nickname).build();

        customerRepository.save(customer);
        return true;
    }
}
