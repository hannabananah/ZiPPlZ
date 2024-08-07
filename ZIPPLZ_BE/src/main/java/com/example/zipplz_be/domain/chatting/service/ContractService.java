package com.example.zipplz_be.domain.chatting.service;

import com.example.zipplz_be.domain.chatting.entity.Chatroom;
import com.example.zipplz_be.domain.chatting.entity.Request;
import com.example.zipplz_be.domain.chatting.exception.DuplicateContractException;
import com.example.zipplz_be.domain.chatting.repository.jpa.ChatroomRepository;
import com.example.zipplz_be.domain.chatting.repository.jpa.RequestRepository;
import com.example.zipplz_be.domain.material.entity.Material;
import com.example.zipplz_be.domain.material.repository.MaterialRepository;
import com.example.zipplz_be.domain.model.MaterialWorkRelation;
import com.example.zipplz_be.domain.model.entity.Field;
import com.example.zipplz_be.domain.model.repository.FieldRepository;
import com.example.zipplz_be.domain.model.repository.MaterialWorkRelationRepository;
import com.example.zipplz_be.domain.schedule.entity.Plan;
import com.example.zipplz_be.domain.schedule.entity.Work;
import com.example.zipplz_be.domain.schedule.exception.WorkerNotFoundException;
import com.example.zipplz_be.domain.schedule.repository.PlanRepository;
import com.example.zipplz_be.domain.schedule.repository.WorkRepository;
import com.example.zipplz_be.domain.user.entity.Customer;
import com.example.zipplz_be.domain.user.entity.User;
import com.example.zipplz_be.domain.user.entity.Worker;
import com.example.zipplz_be.domain.user.repository.CustomerRepository;
import com.example.zipplz_be.domain.user.repository.UserRepository;
import com.example.zipplz_be.domain.user.repository.WorkerRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class ContractService {
    private final PlanRepository planRepository;
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final WorkRepository workRepository;
    private final WorkerRepository workerRepository;
    private final FieldRepository fieldRepository;
    private final MaterialRepository materialRepository;
    private final MaterialWorkRelationRepository materialWorkRelationRepository;
    private final RequestRepository requestRepository;
    private final ChatroomRepository chatroomRepository;

    ContractService(ChatroomRepository chatroomRepository, RequestRepository requestRepository, MaterialWorkRelationRepository materialWorkRelationRepository, MaterialRepository materialRepository, FieldRepository fieldRepository, WorkerRepository workerRepository, WorkRepository workRepository, UserRepository userRepository, CustomerRepository customerRepository, PlanRepository planRepository) {
        this.chatroomRepository = chatroomRepository;
        this.requestRepository = requestRepository;
        this.materialWorkRelationRepository= materialWorkRelationRepository;
        this.materialRepository = materialRepository;
        this.fieldRepository = fieldRepository;
        this.workerRepository = workerRepository;
        this.workRepository = workRepository;
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.planRepository = planRepository;
    }

    @Transactional
    public void insertContractDraftService(int userSerial, int chatroomSerial, Map<String, Object> params) {
        User user = userRepository.findByUserSerial(userSerial);
        Worker worker = workerRepository.findByUserSerial(user);

        if(worker == null) {
            throw new WorkerNotFoundException("계약서를 초본 작성하는 유저가 유효한 시공자가 아닙니다.");
        }

        //해당 고객 찾기
        Chatroom chatroom = chatroomRepository.findByChatroomSerial(chatroomSerial);
        Customer customer = customerRepository.findByUserSerial(chatroom.getCuser());

        Plan plan = planRepository.findByCustomerSerialAndIsActive(customer, 1);

        String fieldName = (String) params.get("fieldName");
        Field field = fieldRepository.findByFieldName(fieldName);

        //plan과 분야, awaiting으로 존재하는지 확인
        List<Work> works = workRepository.findByPlanSerialAndFieldNameAndStatus(plan, fieldName, "awaiting");

        if(!works.isEmpty()) {
            throw new DuplicateContractException("요청된 계약서 초안이 존재합니다.");
        }

        Timestamp endDate = convertStringToTimestamp((String) params.get("endDate"));
        Timestamp startDate = convertStringToTimestamp((String) params.get("startDate"));

        //자재 리스트
        List<Integer> materialList  = (List<Integer>) params.get("materialList");

        List<Work> originalWork = workRepository.findByPlanSerialAndFieldNameAndStatus(plan, fieldName, "draft");
        Work work = Work.builder()
                .status("awaiting")
                .endDate(endDate)
                .startDate(startDate)
                .fieldName(fieldName)
                .workPrice((Integer) params.get("workPrice"))
                .field(field)
                .plan(plan)
                .build();

        work.setWorkerSerial(worker);
        workRepository.save(work);

        System.out.println("work complete");

        //자재 리스트를 자재-공종 관계 테이블에 삽입(공종은 지금 넣을걸로)
        for(int i: materialList) {
            Material material = materialRepository.findByMaterialSerial(i);

            MaterialWorkRelation materialWorkRelation = MaterialWorkRelation.builder()
                    .materialSerial(material)
                    .workSerial(work)
                    .build();

            materialWorkRelationRepository.save(materialWorkRelation);
        }
        System.out.println("material complete");

        Timestamp curDate = new Timestamp(System.currentTimeMillis());

        //요청 테이블에 해당 요청을 삽입한다.
        Request request = Request.builder()
                .requestComment((String) params.get("requestComment"))
                .workSerial(originalWork.get(0))
                .receiver(userRepository.findByUserSerial(customer.getUserSerial().getUserSerial()))
                .sender(user)
                .requestDate(curDate)
                .requestStatus("pending")
                .requestType("add")
                .build();

        requestRepository.save(request);
        System.out.println("request complete");

    }

    private Timestamp convertStringToTimestamp(String dateString) {
        LocalDateTime localDateTime = LocalDateTime.parse(dateString + "T00:00:00");
        return Timestamp.valueOf(localDateTime);
    }
}
