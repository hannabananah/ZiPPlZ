package com.example.zipplz_be.domain.chatting.controller;

import com.example.zipplz_be.domain.chatting.dto.ContractDTO;
import com.example.zipplz_be.domain.chatting.dto.ContractRequestDTO;
import com.example.zipplz_be.domain.chatting.entity.Request;
import com.example.zipplz_be.domain.chatting.exception.ContractNotFoundException;
import com.example.zipplz_be.domain.chatting.exception.DuplicateContractException;
import com.example.zipplz_be.domain.chatting.service.ContractService;
import com.example.zipplz_be.domain.model.dto.ResponseDTO;
import com.example.zipplz_be.domain.portfolio.exception.UnauthorizedUserException;
import com.example.zipplz_be.domain.portfolio.service.PortfolioService;
import com.example.zipplz_be.domain.schedule.exception.WorkerNotFoundException;
import io.openvidu.java.client.Session;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
     public ResponseEntity<?> insertContractDraft(Authentication authentication, @PathVariable int chatroomSerial, @RequestBody Map<String, Object> params) {
         ResponseDTO<?> responseDTO;
         HttpStatus status = HttpStatus.ACCEPTED;

         try {
             int userSerial = portfolioService.getUserSerial(authentication);

             ContractRequestDTO request = contractService.insertContractDraftService(userSerial,chatroomSerial, params);

             status = HttpStatus.CREATED;
             responseDTO = new ResponseDTO<>(status.value(), "계약서 초본 작성 성공!", request);
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
    @GetMapping("/{chatroomSerial}")
    public ResponseEntity<?> getContract(Authentication authentication, @PathVariable int chatroomSerial) {
        ResponseDTO<?> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            ContractDTO contractDTO = contractService.getContractService(portfolioService.getUserSerial(authentication), chatroomSerial);

            status = HttpStatus.OK;
            responseDTO = new ResponseDTO<>(status.value(), "조회 성공!", contractDTO);
        } catch (ContractNotFoundException e) {
            status = HttpStatus.NOT_FOUND;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch (UnauthorizedUserException e) {
            status = HttpStatus.UNAUTHORIZED;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }

    //요청 수락
    @PatchMapping("/{requestSerial}/accept")
    public ResponseEntity<?> acceptRequest(Authentication authentication, @PathVariable int requestSerial) {
        ResponseDTO<?> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            contractService.acceptRequestService(portfolioService.getUserSerial(authentication), requestSerial);

            status = HttpStatus.OK;
            responseDTO = new ResponseDTO<>(status.value(), "요청 수락 완료!");
        } catch (UnauthorizedUserException e) {
            status = HttpStatus.UNAUTHORIZED;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch (DuplicateContractException e) {
            status= HttpStatus.BAD_REQUEST;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }

    //요청 거절
    @PatchMapping("/{requestSerial}/reject")
    public ResponseEntity<?> rejectRequest(Authentication authentication, @PathVariable int requestSerial) {
        ResponseDTO<?> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            contractService.rejectRequestService(portfolioService.getUserSerial(authentication), requestSerial);

            status = HttpStatus.OK;
            responseDTO = new ResponseDTO<>(status.value(), "요청 거절 완료!");
        } catch (UnauthorizedUserException e) {
            status = HttpStatus.UNAUTHORIZED;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch (DuplicateContractException e) {
            status= HttpStatus.BAD_REQUEST;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);

    }

    //계약서 수정 요청
    @PostMapping("/{chatroomSerial}/modifyrequest")
    public ResponseEntity<?> insertModifyRequest(Authentication authentication, @PathVariable int chatroomSerial, @RequestBody Map<String, Object> params) {
        ResponseDTO<?> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            ContractRequestDTO contractRequestDTO = contractService.insertModifyRequestService(portfolioService.getUserSerial(authentication), chatroomSerial, params);

            status = HttpStatus.OK;
            responseDTO = new ResponseDTO<>(status.value(), "수정 요청 완료!", contractRequestDTO);
        } catch (DuplicateContractException e) {
            status = HttpStatus.BAD_REQUEST;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch (UnauthorizedUserException e) {
            status = HttpStatus.UNAUTHORIZED;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }

    //계약서 처리 내역 조회(최신순)
    @GetMapping("/{chatroomSerial}/logs")
    public ResponseEntity<?> getContractLog(Authentication authentication, @PathVariable int chatroomSerial, @RequestParam Map<String, Object> params) {
        ResponseDTO<?> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            List<ContractRequestDTO> requestList = contractService.getContractLogService(portfolioService.getUserSerial(authentication), chatroomSerial, params);

            status = HttpStatus.OK;
            responseDTO = new ResponseDTO<>(status.value(), "조회 성공!", requestList);
        } catch (DuplicateContractException e) {
            status = HttpStatus.BAD_REQUEST;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch (UnauthorizedUserException e) {
            status = HttpStatus.UNAUTHORIZED;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }

    //계약 파기 요청
    @PostMapping("/{chatroomSerial}/terminate")
    public ResponseEntity<?> deleteContractRequest(Authentication authentication, @PathVariable int chatroomSerial, @RequestBody Map<String, Object> params) {
        ResponseDTO<?> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            ContractRequestDTO contractRequestDTO = contractService.deleteContractRequestService(portfolioService.getUserSerial(authentication), chatroomSerial, params);

            status = HttpStatus.OK;
            responseDTO = new ResponseDTO<>(status.value(), "파기 요청 완료!", contractRequestDTO);
        } catch (DuplicateContractException e) {
            status = HttpStatus.BAD_REQUEST;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch (UnauthorizedUserException e) {
            status = HttpStatus.UNAUTHORIZED;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }








        //work 조회할 때 다시 처리해야 함!!

}
