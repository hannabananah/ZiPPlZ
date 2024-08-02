package com.example.zipplz_be.domain.chatting.controller;

import com.example.zipplz_be.domain.schedule.exception.WorkException;
import com.example.zipplz_be.domain.chatting.service.AfterServiceService;
import com.example.zipplz_be.domain.model.dto.ResponseDTO;
import com.example.zipplz_be.domain.chatting.entity.AfterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/afterservice")
public class AfterServiceController {
    private final AfterServiceService afterServiceService;

    AfterServiceController(AfterServiceService afterServiceService) {
        this.afterServiceService = afterServiceService;
    }

    //a/s 내역 불러오기
    @GetMapping("/{workSerial}")
    public ResponseEntity<?> getAfterServiceList(@PathVariable int workSerial, @RequestParam Map<String, Object> params) {
        ResponseDTO<?> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            //공종 번호가 유효한지 검사 후 해당 공종 번호와 일치하는 객체들을 불러옴.
            List<AfterService> afterServiceList = afterServiceService.getAfterServiceListService(workSerial, params);

            status= HttpStatus.OK;
            responseDTO = new ResponseDTO<>(status.value(), "조회 성공!", afterServiceList);
        } catch(WorkException e) {
            status = HttpStatus.NOT_FOUND;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch(Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }




    //고객이 채팅방에서 a/s요청(끝난지 n년 이하일 때만 요청 가능) -> 시공자가 수락 후 추가 시행
    //a/s 평가하기(별점) -> 뱃지 쪽 점수에 반영
    //a/s 완료/수락하기


}
