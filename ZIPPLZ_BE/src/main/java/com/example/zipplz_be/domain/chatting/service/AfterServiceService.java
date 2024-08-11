package com.example.zipplz_be.domain.chatting.service;

import com.example.zipplz_be.domain.chatting.entity.Chatroom;
import com.example.zipplz_be.domain.chatting.repository.jpa.AfterServciceRepository;
import com.example.zipplz_be.domain.chatting.repository.jpa.ChatroomRepository;
import com.example.zipplz_be.domain.model.entity.Field;
import com.example.zipplz_be.domain.portfolio.entity.Portfolio;
import com.example.zipplz_be.domain.portfolio.exception.UnauthorizedUserException;
import com.example.zipplz_be.domain.portfolio.repository.PortfolioRepository;
import com.example.zipplz_be.domain.schedule.entity.Plan;
import com.example.zipplz_be.domain.schedule.entity.Work;
import com.example.zipplz_be.domain.schedule.exception.WorkException;
import com.example.zipplz_be.domain.schedule.repository.PlanRepository;
import com.example.zipplz_be.domain.schedule.repository.WorkRepository;
import com.example.zipplz_be.domain.chatting.entity.AfterService;
import com.example.zipplz_be.domain.user.entity.Customer;
import com.example.zipplz_be.domain.user.entity.Worker;
import com.example.zipplz_be.domain.user.repository.CustomerRepository;
import com.example.zipplz_be.domain.user.repository.WorkerRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

@Service
public class AfterServiceService {
    private final AfterServciceRepository afterServciceRepository;
    private final WorkRepository workRepository;
    private final ChatroomRepository chatroomRepository;
    private final PlanRepository planRepository;
    private final CustomerRepository customerRepository;
    private final PortfolioRepository portfolioRepository;
    private final WorkerRepository workerRepository;

    AfterServiceService(WorkerRepository workerRepository, PortfolioRepository portfolioRepository, CustomerRepository customerRepository, PlanRepository planRepository, ChatroomRepository chatroomRepository, WorkRepository workRepository, AfterServciceRepository afterServciceRepository) {
        this.workerRepository = workerRepository;
        this.portfolioRepository = portfolioRepository;
        this.customerRepository = customerRepository;
        this.planRepository = planRepository;
        this.chatroomRepository = chatroomRepository;
        this.workRepository = workRepository;
        this.afterServciceRepository = afterServciceRepository;
    }

    @Transactional
    public List<AfterService> getAfterServiceListService(int chatroomSerial, Map<String, Object> params) {
        Pageable pageable = PageRequest.of(Integer.parseInt((String) params.get("pgno")), Integer.parseInt((String) params.get("spp")));

        Chatroom chatroom = chatroomRepository.findByChatroomSerial(chatroomSerial);
        Customer customer = customerRepository.findByUserSerial(chatroom.getCuser());

        Plan plan = planRepository.findByCustomerSerialAndIsActive(customer,1);
        List<Work> workList = workRepository.findByPlanSerialAndFieldNameAndStatus(plan, chatroom.getFieldName(), "confirmed");

        if(workList.size() != 1) {
            throw new WorkException("확정된 공종 데이터가 없거나 두 개 이상입니다.");
        }
        Page<AfterService> asPage = afterServciceRepository.findByWorkSerial(workList.get(0), pageable);

        return asPage.getContent();
    }

    @Transactional
    public void afterServiceRequestService(int userSerial, int chatroomSerial, Map<String, Object> params) {
        Chatroom chatroom = chatroomRepository.findByChatroomSerial(chatroomSerial);

        if(chatroom.getCuser().getUserSerial() != userSerial) {
            throw new UnauthorizedUserException("a/s 요청을 보낼 권한이 없습니다.");
        }
        Customer customer = customerRepository.findByUserSerial(chatroom.getCuser());

        Worker worker = workerRepository.findByUserSerial(chatroom.getWuser());

        Plan plan = planRepository.findByCustomerSerialAndIsActive(customer,1);
        List<Work> workList = workRepository.findByPlanSerialAndFieldNameAndStatus(plan, chatroom.getFieldName(), "confirmed");

        if(workList.size() != 1) {
            throw new WorkException("확정된 공종 데이터가 없거나 두 개 이상입니다.");
        }
        if(workList.get(0).getIsCompleted() == 0) {
            throw new WorkException("아직 완료되지 않은 공종입니다.");
        }

        Portfolio portfolio = portfolioRepository.findByWorkerAndFieldId(worker, workList.get(0).getFieldCode());
        Timestamp curDate = new Timestamp(System.currentTimeMillis());

        Calendar cal = Calendar.getInstance();
        cal.setTimeInMillis(workList.get(0).getEndDate().getTime());
        cal.add(Calendar.YEAR, portfolio.getAsPeriod());

        Timestamp marginDate = new Timestamp(cal.getTime().getTime());

        if(curDate.compareTo(marginDate) > 0) {
            throw new WorkException("A/S 기간이 지났습니다.");
        }

        AfterService afterService = AfterService.builder()
                .workSerial(workList.get(0))
                .requestContent((String) params.get("requestContent"))
                .requestDate(curDate)
                .build();

        afterServciceRepository.save(afterService);
    }

    @Transactional
    public void afterServiceReviewService(int afterServiceSerial, Map<String, Object> params) {
        AfterService afterService = afterServciceRepository.findByAfterServiceSerial(afterServiceSerial);

        Timestamp curDate = new Timestamp(System.currentTimeMillis());

        afterService.setResolveDate(curDate);
        afterService.setAsScore((Integer) params.get("asScore"));

        afterServciceRepository.save(afterService);
    }
}
