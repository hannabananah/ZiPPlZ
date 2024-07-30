package com.example.zipplz_be.domain.Schedule.service;

import com.example.zipplz_be.domain.Schedule.entity.Plan;
import com.example.zipplz_be.domain.Schedule.entity.Work;
import com.example.zipplz_be.domain.Schedule.exception.CustomerNotFoundException;
import com.example.zipplz_be.domain.Schedule.exception.DuplicateFieldException;
import com.example.zipplz_be.domain.Schedule.exception.PlanNotFoundException;
import com.example.zipplz_be.domain.Schedule.repository.PlanRepository;
import com.example.zipplz_be.domain.Schedule.repository.WorkRepository;
import com.example.zipplz_be.domain.model.entity.Field;
import com.example.zipplz_be.domain.model.repository.FieldRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class WorkService {
    private final WorkRepository workRepository;
    private final PlanRepository planRepository;
    private final FieldRepository fieldRepository;

    WorkService(WorkRepository workRepository, PlanRepository planRepository, FieldRepository fieldRepository) {
        this.workRepository = workRepository;
        this.planRepository = planRepository;
        this.fieldRepository = fieldRepository;
    }

    @Transactional
    public List<Work> getWorkListService(int planSerial, Map<String, Object> params) {
        //먼저 planSerial과 일치하는 Work 객체들을 가져오고, 페이징에 맞춰서 return

        Pageable pageable = PageRequest.of(Integer.parseInt((String) params.get("pgno")), Integer.parseInt((String) params.get("spp")));
        Plan plan = planRepository.findByPlanSerial(planSerial);

        if (plan == null) {
            throw new PlanNotFoundException("유효하지 않은 계획 연번입니다.");
        }
        Page<Work> workPage = workRepository.findByPlanSerial(plan, pageable);

        return workPage.getContent();
    }

    @Transactional
    public void insertWorkService(int planSerial, Map<String, Object> params) {
        //planSerial 객체 찾기
        //fieldName으로 객체 찾기
        //work에서 fieldName 뒤져보고 있으면 중복이므로 빼기

        String fieldName = (String) params.get("fieldName");
        Plan plan = planRepository.findByPlanSerial(planSerial);

        if (plan == null) throw new PlanNotFoundException("유효하지 않은 계획 연번입니다.");
        if(workRepository.existsByFieldNameAndPlanSerial(fieldName, plan)) {
            //work에 존재한다면?
            throw new DuplicateFieldException("이미 존재하는 공종 분야입니다.");
        }

        Field field = fieldRepository.findByFieldName(fieldName);

        if(field == null) {
            //커스텀이므로 field_id는 0, 이름은 저장해둔 대로
            field = fieldRepository.findByFieldCode(0);
        }

        Work work = Work.builder()
                .plan(plan)
                .field(field)
                .fieldName(fieldName)
                .build();

        workRepository.save(work);
    }

}

