package com.example.zipplz_be.domain.model.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface S3Service {

    String uploadImage(MultipartFile image);

    String uploadToS3(MultipartFile image) throws IOException;
}
