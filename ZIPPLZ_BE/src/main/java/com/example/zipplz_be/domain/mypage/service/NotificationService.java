package com.example.zipplz_be.domain.mypage.service;

import com.example.zipplz_be.domain.mypage.entity.Notification;

import java.time.LocalDateTime;

public interface NotificationService {
    int addNotification(int userSerial, String notificationComment, LocalDateTime notificationDate, int isChecked);
}