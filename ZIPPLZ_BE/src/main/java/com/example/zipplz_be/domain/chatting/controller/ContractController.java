package com.example.zipplz_be.domain.chatting.controller;

import com.example.zipplz_be.domain.chatting.exception.DuplicateContractException;
import com.example.zipplz_be.domain.chatting.service.ContractService;
import com.example.zipplz_be.domain.model.dto.ResponseDTO;
import com.example.zipplz_be.domain.portfolio.service.PortfolioService;
import com.example.zipplz_be.domain.schedule.exception.WorkerNotFoundException;
import io.openvidu.java.client.Session;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/contract")
public class ContractController {
    private final ContractService contractService;
    private final PortfolioService portfolioService;

     public ContractController(PortfolioService portfolioService, ContractService contractService) {
         this.portfolioService = portfolioService;
         this.contractService = contractService;
     }

     //계약서 초본 작성
     @PostMapping("/draft/{chatroomSerial}")
     public ResponseEntity<ResponseDTO<?>> insertContractDraft(Authentication authentication, @PathVariable int chatroomSerial, @RequestBody Map<String, Object> params) {
         ResponseDTO<Session> responseDTO;
         HttpStatus status = HttpStatus.ACCEPTED;

         try {
             int userSerial = portfolioService.getUserSerial(authentication);

             contractService.insertContractDraftService(userSerial,chatroomSerial, params);

             status = HttpStatus.CREATED;
             responseDTO = new ResponseDTO<>(status.value(), "계약서 초본 작성 성공!");
         } catch (DuplicateContractException e) {
             status = HttpStatus.BAD_REQUEST;
             responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
         }
         catch (WorkerNotFoundException e) {
             status = HttpStatus.NOT_FOUND;
             responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
         } catch (Exception e) {
             status = HttpStatus.INTERNAL_SERVER_ERROR;
             responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
         }

         return new ResponseEntity<>(responseDTO, status);
     }

     //계약서 내용 조회




    //계약서 수정 요청

    //수정 요청 수락

    //수정 요청 거절

    //계약서 처리 내역 조회

}
