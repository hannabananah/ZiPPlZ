package com.example.zipplz_be.domain.Schedule.controller;

import com.example.zipplz_be.domain.Schedule.entity.Plan;
import com.example.zipplz_be.domain.Schedule.exception.CustomerNotFoundException;
import com.example.zipplz_be.domain.Schedule.service.PlanService;
import com.example.zipplz_be.domain.model.dto.ResponseDTO;
import com.example.zipplz_be.domain.user.dto.CustomUserDetails;
import com.example.zipplz_be.domain.user.jwt.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/schedule")
public class PlanController {
    private final PlanService planService;

    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    //계획 조회
    @GetMapping("/plans")
    public ResponseEntity<ResponseDTO<?>> getPlan(Authentication authentication, HttpServletRequest request) {
        //plan 테이블에서 현재 로그인한 유저의 계획 정보들 모두 가져오기
        ResponseDTO<?> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
            int userSerial = customUserDetails.getUserSerial();
            List<Plan> planList = planService.getPlanService(userSerial);

            status= HttpStatus.OK;
            responseDTO = new ResponseDTO<>(status.value(),"조회 성공",  planList);
        } catch (CustomerNotFoundException e) {
            status= HttpStatus.NOT_FOUND;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }




    //계획 추가



}
