package com.example.zipplz_be.domain.chatting.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContractRequestDTO {
    int requestSerial;
    String requestDate;
    String requestType;
    int senderSerial;
    int receiverSerial;
    String requestStatus;
    String requestComment;
}
