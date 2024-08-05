package com.example.zipplz_be.domain.chatting.service;

import com.example.zipplz_be.domain.chatting.repository.jpa.AfterServciceRepository;
import com.example.zipplz_be.domain.schedule.entity.Work;
import com.example.zipplz_be.domain.schedule.exception.WorkException;
import com.example.zipplz_be.domain.schedule.repository.WorkRepository;
import com.example.zipplz_be.domain.chatting.entity.AfterService;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AfterServiceService {
    private final AfterServciceRepository afterServciceRepository;
    private final WorkRepository workRepository;

    AfterServiceService(WorkRepository workRepository, AfterServciceRepository afterServciceRepository) {
        this.workRepository = workRepository;
        this.afterServciceRepository = afterServciceRepository;
    }

    @Transactional
    public List<AfterService> getAfterServiceListService(int workSerial, Map<String, Object> params) {
        Pageable pageable = PageRequest.of(Integer.parseInt((String) params.get("pgno")), Integer.parseInt((String) params.get("spp")));
        Work work = workRepository.findByWorkSerial(workSerial);

        if(work== null) throw new WorkException("공종 연번이 유효하지 않습니다.");

        Page<AfterService> asPage = afterServciceRepository.findByWorkSerial(work, pageable);

        return asPage.getContent();
    }
}
