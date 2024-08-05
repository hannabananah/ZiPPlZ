package com.example.zipplz_be.domain.schedule.dto;

import com.example.zipplz_be.domain.file.entity.File;
import com.example.zipplz_be.domain.schedule.entity.Plan;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PlanDetailDTO {
    Plan plan;
    List<File> fileList;

    @Builder
    public PlanDetailDTO(Plan plan, List<File> fileList) {
        this.plan = plan;
        this.fileList = fileList;
    }
}
