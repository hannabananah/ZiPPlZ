package com.example.zipplz_be.domain.mypage.controller;

import com.example.zipplz_be.domain.model.dto.ResponseDTO;
import com.example.zipplz_be.domain.mypage.entity.Notification;
import com.example.zipplz_be.domain.mypage.service.NotificationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/notification")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("add")
    public ResponseEntity<ResponseDTO<Boolean>> addNotification(@RequestBody(required = false) Map<String, Object> params) {
        ResponseDTO<Boolean> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            // 해당 정보 가져오기
            int user_serial = (int) params.get("user_serial");
            String notification_comment = (String) params.get("notification_comment");
            LocalDateTime notification_date = LocalDateTime.now();
            int is_checked = 0;

            int result = notificationService.addNotification(user_serial, notification_comment, notification_date, is_checked);
            if (result == 1 ) {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "알림 저장 완료", true);
            } else {
                status = HttpStatus.BAD_REQUEST;
                responseDTO = new ResponseDTO<>(status.value(), "알림 저장 실패");
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }


}
