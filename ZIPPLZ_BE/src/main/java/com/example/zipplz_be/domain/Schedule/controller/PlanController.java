package com.example.zipplz_be.domain.Schedule.controller;

import com.example.zipplz_be.domain.Schedule.entity.Plan;
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
    private final JWTUtil jwtUtil;

    public PlanController(PlanService planService, JWTUtil jwtUtil) {
        this.planService = planService;
        this.jwtUtil = jwtUtil;
    }

    //계획 조회
    @GetMapping("/plans")
    public ResponseEntity<ResponseDTO<?>> getPlan(Authentication authentication, HttpServletRequest request) {
        //plan 테이블에서 현재 로그인한 유저의 계획 정보들 모두 가져오기

        //customer 테이블에 존재하지 않는 유저라면, 애초부터 존재하지 않는 유저거나 시공자임!!

        ResponseDTO<?> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

            int customerSerial = customUserDetails.getUserSerial();

            List<Plan> planList = planService.getPlanService(customerSerial);

            status= HttpStatus.OK;
            responseDTO = new ResponseDTO<>(status.value(),"조회 성공",  planList);
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }




    //계획 추가







//    //세션 생성
//    @PostMapping("/api/sessions")
//    public ResponseEntity<ResponseDTO<?>> initializeSession(@RequestBody(required = false) Map<String, Object> params)
//            throws OpenViduJavaClientException, OpenViduHttpException {
//        ResponseDTO<?> responseDTO;
//        HttpStatus status = HttpStatus.ACCEPTED;
//
//        try {
//                if (!flag) {
//                    status = HttpStatus.NOT_FOUND;
//                    responseDTO = new ResponseDTO<>(status.value(), "유효하지 않은 채팅방 번호");
//                } else {
//                    status = HttpStatus.OK;
//                    responseDTO = new ResponseDTO<>(status.value(), "응답 성공", session.getSessionId());
//                }
//            }
//        } catch (Exception e) {
//            status = HttpStatus.INTERNAL_SERVER_ERROR;
//            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
//        }
//
//        return new ResponseEntity<>(responseDTO, status);
//    }



}
