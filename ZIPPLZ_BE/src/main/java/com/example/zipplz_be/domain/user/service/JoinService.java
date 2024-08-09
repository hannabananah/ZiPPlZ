package com.example.zipplz_be.domain.user.service;

import com.example.zipplz_be.domain.model.entity.Field;
import com.example.zipplz_be.domain.model.entity.Local;
import com.example.zipplz_be.domain.model.repository.LocalRepository;
import com.example.zipplz_be.domain.portfolio.entity.Portfolio;
import com.example.zipplz_be.domain.portfolio.repository.PortfolioRepository;
import com.example.zipplz_be.domain.portfolio.service.PortfolioService;
import com.example.zipplz_be.domain.user.dto.*;
import com.example.zipplz_be.domain.user.entity.Customer;
import com.example.zipplz_be.domain.user.entity.User;
import com.example.zipplz_be.domain.user.entity.Worker;
import com.example.zipplz_be.domain.user.exception.FieldListNullException;
import com.example.zipplz_be.domain.user.repository.CustomerRepository;
import com.example.zipplz_be.domain.user.repository.UserRepository;
import com.example.zipplz_be.domain.user.repository.WorkerRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JoinService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final CustomerRepository customerRepository;
    private final WorkerRepository workerRepository;
    private final PortfolioService portfolioService;
    private final PortfolioRepository portfolioRepository;
    private final LocalRepository localRepository;

    public JoinService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, CustomerRepository customerRepository, WorkerRepository workerRepository, PortfolioService portfolioService, PortfolioRepository portfolioRepository, LocalRepository localRepository) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.customerRepository = customerRepository;
        this.workerRepository = workerRepository;
        this.portfolioService = portfolioService;
        this.portfolioRepository = portfolioRepository;
        this.localRepository = localRepository;
    }

    public boolean isEmailAlreadyExist(String email) {
        return userRepository.existsByEmail(email);
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

    public int joinAfterSocialProcess(JoinRequestDTO joinRequestDTO) {

        String email = joinRequestDTO.getEmail();
        if (!userRepository.existsByEmail(email)) {
            throw new UsernameNotFoundException("해당 유저가 존재하지 않습니다.");
        }

        User user = userRepository.findByEmail(email);
        user.setUserName(joinRequestDTO.getUserName());
        user.setTel(joinRequestDTO.getTel());
        user.setBirthDate(joinRequestDTO.getBirthDate());
        return userRepository.save(user).getUserSerial();
    }

    public boolean insertCustomerInfo(InsertCustomerDTO insertCustomerDTO) {

        int userSerial = insertCustomerDTO.getUserSerial();
        if (!userRepository.existsByUserSerial(userSerial)) {
            throw new UsernameNotFoundException("해당 유저가 존재하지 않습니다.");
        }

        User user = userRepository.findByUserSerial(userSerial);

        user.setRole("customer");
        userRepository.save(user);

        String nickname = insertCustomerDTO.getNickname();
        Customer customer = Customer.builder()
                .userSerial(user)
                .nickname(nickname).build();
        customerRepository.save(customer);

        return true;
    }

    public void insertWorkerInfo(InsertWorkerDTO insertWorkerDTO) {
        System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
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
        Worker savedWorker = workerRepository.save(worker);

        List<WorkerLocationDTO> locationList = insertWorkerDTO.getLocationList();
        if (locationList != null) {
            List<Local> localList = insertWorkerDTO.getLocationList().stream()
                    .map(location ->
                            Local.builder()
                            .userSerial(user)
                            .sidoCode(location.getSidoCode())
                            .gugunCode(location.getGugunCode())
                            .localName(location.getLocalName()).build())
                    .collect(Collectors.toList());
            localRepository.saveAll(localList);
        }

        List<Field> fieldList = insertWorkerDTO.getFieldList();
        if (fieldList == null) {
            throw new FieldListNullException("전문 분야가 없습니다.");
        }
        portfolioService.createPortfolio(savedWorker, fieldList.getFirst());
    }
}
