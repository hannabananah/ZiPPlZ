package com.example.zipplz_be.domain.mypage.service;

import com.example.zipplz_be.domain.mypage.entity.Notification;
import com.example.zipplz_be.domain.mypage.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public int addNotification(int userSerial, String notificationComment, LocalDateTime notificationDate, int isChecked) {
        return notificationRepository.addNotification(userSerial, notificationComment, notificationDate, isChecked);
    }
}
