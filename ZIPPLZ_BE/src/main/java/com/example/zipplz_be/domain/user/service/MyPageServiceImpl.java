package com.example.zipplz_be.domain.user.service;

import com.example.zipplz_be.domain.user.dto.UpdateCustomerDTO;
import com.example.zipplz_be.domain.user.dto.UpdateWorkerDTO;
import com.example.zipplz_be.domain.user.entity.Customer;
import com.example.zipplz_be.domain.user.entity.User;
import com.example.zipplz_be.domain.user.entity.Worker;
import com.example.zipplz_be.domain.user.exception.UserNotFoundException;
import com.example.zipplz_be.domain.user.repository.CustomerRepository;
import com.example.zipplz_be.domain.user.repository.UserRepository;
import com.example.zipplz_be.domain.user.repository.WorkerRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService {

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final WorkerRepository workerRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public boolean updateCustomer(UpdateCustomerDTO updateCustomerDTO) {
        if (!userRepository.existsByUserSerial(updateCustomerDTO.getUserSerial())) {
            throw new UserNotFoundException("해당 유저가 존재하지 않습니다.");
        }
        User orgUser = userRepository.findByUserSerial(updateCustomerDTO.getUserSerial());
        orgUser.setBirthDate(updateCustomerDTO.getBirthDate());
        orgUser.setTel(updateCustomerDTO.getTel());
        User currUser = userRepository.save(orgUser);

        if (!customerRepository.existsByUserSerial(currUser)) {
            throw new UserNotFoundException("해당 고객이 존재하지 않습니다.");
        }
        Customer orgCustomer = customerRepository.findByUserSerial(currUser);
        orgCustomer.setNickname(updateCustomerDTO.getNickname());
        orgCustomer.setCurrentAddress(updateCustomerDTO.getCurrentAddress());
        Customer currCustomer = customerRepository.save(orgCustomer);

        return true;
    }

    @Override
    public boolean updateWorker(UpdateWorkerDTO updateWorkerDTO) {
        if (!userRepository.existsByUserSerial(updateWorkerDTO.getUserSerial())) {
            throw new UserNotFoundException("해당 유저가 존재하지 않습니다.");
        }
        User orgUser = userRepository.findByUserSerial(updateWorkerDTO.getUserSerial());
        orgUser.setBirthDate(updateWorkerDTO.getBirthDate());
        orgUser.setTel(updateWorkerDTO.getTel());
        User currUser = userRepository.save(orgUser);

        if (!workerRepository.existsByUserSerial(currUser)) {
            throw new UserNotFoundException("해당 시공자가 존재하지 않습니다.");
        }
        Worker orgWorker = workerRepository.findByUserSerial(currUser);
        orgWorker.setCompany(updateWorkerDTO.getCompany());
        orgWorker.setCompanyAddress(updateWorkerDTO.getCompanyAddress());
        orgWorker.setBusinessNumber(updateWorkerDTO.getBusinessNumber());
        Worker currWorker = workerRepository.save(orgWorker);

        return true;
    }

    @Override
    public boolean changePassword(int userSerial, String newPassword) {
        if (!userRepository.existsByUserSerial(userSerial)) {
            throw new UserNotFoundException("해당 유저가 존재하지 않습니다.");
        }

        User user = userRepository.findByUserSerial(userSerial);
        user.setPassword(bCryptPasswordEncoder.encode(newPassword));
        User changedUser = userRepository.save(user);

        return true;
    }
}
