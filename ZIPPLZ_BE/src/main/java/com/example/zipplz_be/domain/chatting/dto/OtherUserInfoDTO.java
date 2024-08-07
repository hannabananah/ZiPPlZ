package com.example.zipplz_be.domain.chatting.dto;

import com.example.zipplz_be.domain.file.entity.File;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OtherUserInfoDTO {
    private String location;
    private File image;
}
