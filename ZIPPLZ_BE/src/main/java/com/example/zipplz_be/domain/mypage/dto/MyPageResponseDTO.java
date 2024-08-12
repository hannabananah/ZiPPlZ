package com.example.zipplz_be.domain.mypage.dto;

import com.example.zipplz_be.domain.file.entity.File;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MyPageResponseDTO {
    private File profileImg;
    private String name;
    private String role;
}
