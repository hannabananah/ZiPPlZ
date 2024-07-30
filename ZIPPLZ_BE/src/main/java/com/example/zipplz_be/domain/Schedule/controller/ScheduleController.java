package com.example.zipplz_be.domain.Schedule.controller;

import com.example.zipplz_be.domain.Schedule.entity.Plan;
import com.example.zipplz_be.domain.Schedule.entity.Work;
import com.example.zipplz_be.domain.Schedule.exception.CustomerNotFoundException;
import com.example.zipplz_be.domain.Schedule.exception.DuplicateFieldException;
import com.example.zipplz_be.domain.Schedule.exception.PlanNotFoundException;
import com.example.zipplz_be.domain.Schedule.service.PlanService;
import com.example.zipplz_be.domain.Schedule.service.WorkService;
import com.example.zipplz_be.domain.model.dto.ResponseDTO;
import com.example.zipplz_be.domain.user.dto.CustomUserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/schedule")
public class ScheduleController {
    private final PlanService planService;
    private final WorkService workService;

    public ScheduleController(PlanService planService, WorkService workService) {
        this.planService = planService;
        this.workService = workService;
    }

    //계획 조회
    @GetMapping("/plans")
    public ResponseEntity<ResponseDTO<?>> getPlan(Authentication authentication) {
        //plan 테이블에서 현재 로그인한 유저의 계획 정보들 모두 가져오기
        ResponseDTO<?> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            List<Plan> planList = planService.getPlanService(getUserSerial(authentication));

            status = HttpStatus.OK;
            responseDTO = new ResponseDTO<>(status.value(), "조회 성공", planList);
        } catch (CustomerNotFoundException e) {
            status = HttpStatus.NOT_FOUND;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }


    //공종 추가
    @PostMapping("plans/{planSerial}/works")
    public ResponseEntity<ResponseDTO<?>> insertWork(@PathVariable("planSerial") int planSerial, @RequestBody Map<String, Object> params) {
        //이름 검색해보고 없으면 0으로 넣고, 있으면 field_code 설정해주면 됨
        //worker serial이 없으면 빈 시공 띄우면 됨!

        ResponseDTO<?> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            workService.insertWorkService(planSerial, params);

            status = HttpStatus.OK;
            responseDTO = new ResponseDTO<>(status.value(), "삽입 성공");
        } catch(PlanNotFoundException e) {
            status = HttpStatus.NOT_FOUND;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch(DuplicateFieldException e) {
            status = HttpStatus.BAD_REQUEST;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch(Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }


    //공종 목록 조회(페이징)
    @GetMapping("/plans/{planSerial}/works")
    public ResponseEntity<ResponseDTO<?>> getWorkList(@PathVariable("planSerial") int planSerial, @RequestParam Map<String, Object> params) {
        ResponseDTO<?> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            //공종 테이블에서 해당 planSerial과 일치하는 목록들을 모두 가져오고, 페이징 처리.
            List<Work> workList = workService.getWorkListService(planSerial, params);
            status = HttpStatus.OK;
            responseDTO = new ResponseDTO<>(status.value(),"조회 성공", workList);
        } catch(PlanNotFoundException e) {
            status = HttpStatus.NOT_FOUND;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch(Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }


    //계획 추가(기본 공종들 삽입)
    //시공 분야들 이름 가져오는 api 필요?


    //연번 가져오기
    public int getUserSerial(Authentication authentication) {
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        return customUserDetails.getUserSerial();
    }
}

