package com.example.zipplz_be.domain.schedule.service;

import com.example.zipplz_be.domain.schedule.entity.Plan;
import com.example.zipplz_be.domain.schedule.entity.Work;
import com.example.zipplz_be.domain.schedule.exception.CustomerNotFoundException;
import com.example.zipplz_be.domain.schedule.exception.PlanNotFoundException;
import com.example.zipplz_be.domain.schedule.exception.WorkException;
import com.example.zipplz_be.domain.schedule.repository.PlanRepository;
import com.example.zipplz_be.domain.schedule.repository.WorkRepository;
import com.example.zipplz_be.domain.model.entity.Field;
import com.example.zipplz_be.domain.model.repository.FieldRepository;
import com.example.zipplz_be.domain.user.entity.Customer;
import com.example.zipplz_be.domain.user.entity.User;
import com.example.zipplz_be.domain.user.repository.CustomerRepository;
import com.example.zipplz_be.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class PlanService {
    private final PlanRepository planRepository;
    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;
    private final FieldRepository fieldRepository;
    private final WorkRepository workRepository;


    PlanService(WorkRepository workRepository, PlanRepository planRepository, CustomerRepository customerRepository, UserRepository userRepository,FieldRepository fieldRepository) {
        this.workRepository = workRepository;
        this.planRepository = planRepository;
        this.customerRepository= customerRepository;
        this.userRepository = userRepository;
        this.fieldRepository = fieldRepository;
    }

    @Transactional
    public List<Plan> getPlanService(int userSerial) {
        Customer customer = findUser(userSerial);

        return planRepository.findBycustomerSerial(customer);
    }

    @Transactional
    public void insertPlanService(int userSerial, Map<String, Object> params) {
        Customer customer = findUser(userSerial);

        Plan plan = Plan.builder()
                .address((String) params.get("address"))
                .sharedContents((String) params.get("sharedContents"))
                .customer(customer)
                .build();

        planRepository.save(plan);

        //메인 기본 공종들 work에 추가
        //공종들 불러와서 필드 리스트에 저장
        List<Field> fieldList = fieldRepository.findAll();

        //리스트 돌면서 각각 필드 id와 이름을 채우며 빈 공종들을 만들자!!
        for(Field field : fieldList) {
            if(field.getFieldCode() != 0) {
                Work work = Work.builder()
                        .field(field)
                        .fieldName(field.getFieldName())
                        .plan(plan).build();

                workRepository.save(work);
            }
        }
    }

    @Transactional
    public void modifyPlanService(int userSerial, int planSerial, Map<String, Object> params) {
        Customer customer = findUser(userSerial);

        //계획 소유자인지 검사
        Plan plan = planRepository.findByPlanSerial(planSerial);
        if(plan == null) {
            throw new PlanNotFoundException("유효하지 않은 계획 연번입니다.");
        }
        if(!plan.getCustomerSerial().equals(customer)) {
            throw new CustomerNotFoundException("현재 유저는 고객이 아니거나 유효하지 않은 유저입니다.");
        }

        //주어진 요소 수정(수정되지 않은 부분은 원본으로 들어와야 함!!)
        plan.setAddress((String) params.get("address"));
        plan.setSharedContents((String) params.get("sharedContents"));

        planRepository.save(plan);
    }

    @Transactional
    public void deletePlanService(int userSerial, int planSerial) {
        Customer customer = findUser(userSerial);

        //계획 소유자인지 검사
        Plan plan = planRepository.findByPlanSerial(planSerial);
        if(plan == null) {
            throw new PlanNotFoundException("유효하지 않은 계획 연번입니다.");
        }
        if(!plan.getCustomerSerial().equals(customer)) {
            throw new CustomerNotFoundException("현재 유저는 고객이 아니거나 유효하지 않은 유저입니다.");
        }

        //계획의 모든 공종들을 살펴보며, 모두 비어있다면, 그 공종들도 모두 날리고 마지막으로 plan을 삭제한다.
        List<Work> workList = workRepository.findByPlanSerial(plan);

        for(Work work: workList) {
            if(work.getWorkerSerial() != null) {
                throw new WorkException("계약서가 작성된 공종은 파기 이전엔 삭제할 수 없습니다.");
            }
        }

        planRepository.delete(plan);
    }


    public Customer findUser(int userSerial) {
        //현재 로그인한 유저의 계획으로 집주소, 공유내용 포함하여 추가
        User user = userRepository.findByUserSerial(userSerial);

        Customer customer = customerRepository.findByUserSerial(user);

        //여기서 null이면 고객이 아닌 것
        if(customer == null) {
            throw new CustomerNotFoundException("현재 유저는 고객이 아니거나 유효하지 않은 유저입니다.");
        }

        return customer;
    }

}
