package com.example.zipplz_be.domain.mypage.service;

import com.example.zipplz_be.domain.file.entity.File;
import com.example.zipplz_be.domain.file.repository.FileRepository;
import com.example.zipplz_be.domain.model.entity.Local;
import com.example.zipplz_be.domain.model.repository.LocalRepository;
import com.example.zipplz_be.domain.mypage.dto.MyPageResponseDTO;
import com.example.zipplz_be.domain.mypage.dto.UpdateCustomerDTO;
import com.example.zipplz_be.domain.mypage.dto.UpdateWorkerDTO;
import com.example.zipplz_be.domain.user.dto.WorkerLocationDTO;
import com.example.zipplz_be.domain.user.entity.Customer;
import com.example.zipplz_be.domain.user.entity.User;
import com.example.zipplz_be.domain.user.entity.Worker;
import com.example.zipplz_be.domain.user.exception.UserNotFoundException;
import com.example.zipplz_be.domain.user.repository.CustomerRepository;
import com.example.zipplz_be.domain.user.repository.UserRepository;
import com.example.zipplz_be.domain.user.repository.WorkerRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService {

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final WorkerRepository workerRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final LocalRepository localRepository;
    private final FileRepository fileRepository;

    @Override
    public MyPageResponseDTO getMyPage(int userSerial, String role) {
        if (!userRepository.existsByUserSerial(userSerial)) {
            throw new UserNotFoundException("해당 유저가 존재하지 않습니다.");
        }
        User user = userRepository.findByUserSerial(userSerial);
        return MyPageResponseDTO.builder()
                .profileImg(user.getFileSerial())
                .name(user.getUserName())
                .role(role).build();
    }

    @Override
    public boolean updateCustomer(UpdateCustomerDTO updateCustomerDTO) {
        if (!userRepository.existsByUserSerial(updateCustomerDTO.getUserSerial())) {
            throw new UserNotFoundException("해당 유저가 존재하지 않습니다.");
        }
        User orgUser = userRepository.findByUserSerial(updateCustomerDTO.getUserSerial());
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
    @Transactional
    public boolean updateWorker(UpdateWorkerDTO updateWorkerDTO) {
        if (!userRepository.existsByUserSerial(updateWorkerDTO.getUserSerial())) {
            throw new UserNotFoundException("해당 유저가 존재하지 않습니다.");
        }
        User orgUser = userRepository.findByUserSerial(updateWorkerDTO.getUserSerial());
        orgUser.setTel(updateWorkerDTO.getTel());
        User currUser = userRepository.save(orgUser);

        if (!workerRepository.existsByUserSerial(currUser)) {
            throw new UserNotFoundException("해당 시공자가 존재하지 않습니다.");
        }

        localRepository.deleteByUserSerial(currUser); // 기존 활동지역 삭제
        List<WorkerLocationDTO> locationList = updateWorkerDTO.getLocationList();
        if (locationList != null) {
            List<Local> localList = locationList.stream()
                    .map(
                            location -> Local.builder()
                                    .userSerial(currUser)
                                    .sidoCode(location.getSidoCode())
                                    .gugunCode(location.getGugunCode())
                                    .localName(location.getLocalName()).build())
                    .collect(Collectors.toList());
            localRepository.saveAll(localList);
        }
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
