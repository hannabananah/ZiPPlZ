package com.example.zipplz_be.domain.Schedule.controller;

import com.example.zipplz_be.domain.Schedule.service.PlanService;
import com.example.zipplz_be.domain.model.dto.ResponseDTO;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/plan")
public class PlanController {
    private final PlanService planService;

    public PlanController(PlanService planService) {
        this.planService = planService;
    }

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
