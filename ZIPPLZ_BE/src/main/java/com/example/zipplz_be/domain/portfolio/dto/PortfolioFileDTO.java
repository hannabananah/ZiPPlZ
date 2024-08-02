package com.example.zipplz_be.domain.portfolio.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioFileDTO {
    int portfolio_serial;
    int fild_srial;
    String save_folder;
    String original_file;
    String save_file;
    int user_serial;
}
