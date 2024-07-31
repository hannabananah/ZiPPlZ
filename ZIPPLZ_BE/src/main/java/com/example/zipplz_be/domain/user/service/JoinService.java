package com.example.zipplz_be.domain.user.service;

import com.example.zipplz_be.domain.user.dto.InsertCustomerDTO;
import com.example.zipplz_be.domain.user.dto.InsertWorkerDTO;
import com.example.zipplz_be.domain.user.dto.JoinRequestDTO;
import com.example.zipplz_be.domain.user.entity.Customer;
import com.example.zipplz_be.domain.user.entity.User;
import com.example.zipplz_be.domain.user.entity.Worker;
import com.example.zipplz_be.domain.user.repository.CustomerRepository;
import com.example.zipplz_be.domain.user.repository.UserRepository;
import com.example.zipplz_be.domain.user.repository.WorkerRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JoinService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final CustomerRepository customerRepository;
    private final WorkerRepository workerRepository;

    public JoinService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, CustomerRepository customerRepository, WorkerRepository workerRepository) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.customerRepository = customerRepository;
        this.workerRepository = workerRepository;
    }

    public int joinProcess(JoinRequestDTO joinRequestDTO) {

        String email = joinRequestDTO.getEmail();

        Boolean isExist = userRepository.existsByEmail(email);

        if (isExist) {
            return -1;
        }

        String password = joinRequestDTO.getPassword();
        joinRequestDTO.setPassword(bCryptPasswordEncoder.encode(password));
        User user = userRepository.save(joinRequestDTO.toEntity());
        System.out.println(user.getUserSerial());

        return user.getUserSerial();
    }

    public void joinAfterSocialProcess(int userSerial, JoinRequestDTO joinRequestDTO) {

        if (!userRepository.existsByUserSerial(userSerial)) {
            throw new UsernameNotFoundException("해당 유저가 존재하지 않습니다.");
        }

        User user = userRepository.findByUserSerial(userSerial);
        user.setUserName(joinRequestDTO.getUserName());
        user.setTel(joinRequestDTO.getTel());
        user.setBirthDate(joinRequestDTO.getBirthDate());
        userRepository.save(user);
    }

    public boolean insertCustomerInfo(InsertCustomerDTO insertCustomerDTO) {

        int userSerial = insertCustomerDTO.getUserSerial();
        if (!userRepository.existsByUserSerial(userSerial)) {
            throw new UsernameNotFoundException("해당 유저가 존재하지 않습니다.");
        }

        User user = userRepository.findByUserSerial(userSerial);

        user.setRole("customer");
        System.out.println("!!!!!!!!!!!!!insertCustomerInfo, customer's role => " + user.getRole());
        userRepository.save(user);

        String nickname = insertCustomerDTO.getNickname();
        Customer customer = Customer.builder()
                .userSerial(user)
                .nickname(nickname).build();
        customerRepository.save(customer);

        return true;
    }

    public boolean insertWorkerInfo(InsertWorkerDTO insertWorkerDTO) {

        int userSerial = insertWorkerDTO.getUserSerial();
        if (!userRepository.existsByUserSerial(userSerial)) {
            throw new UsernameNotFoundException("해당 유저가 존재하지 않습니다.");
        }

        User user = userRepository.findByUserSerial(userSerial);
        user.setRole("worker");
        userRepository.save(user);

        String businessNumber = insertWorkerDTO.getBusinessNumber();
        String company = insertWorkerDTO.getCompany();
        String companyAddress = insertWorkerDTO.getCompanyAddress();

        Worker worker = Worker.builder()
                .userSerial(user)
                .businessNumber(businessNumber)
                .company(company)
                .companyAddress(companyAddress).build();
        workerRepository.save(worker);

        return true;
    }
}
