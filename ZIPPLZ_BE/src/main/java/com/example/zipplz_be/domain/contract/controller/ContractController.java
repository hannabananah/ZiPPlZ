package com.example.zipplz_be.domain.contract.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/contract")
public class ContractController {
    //계약서 작성
    //이미 만들어진 work를 수정하는 느낌.
    //고객 연번(plan의), worker_serial(업자 검색 필요, 현재 로그인한 유저),시작날짜, 종료날짜, 시공 가격
    //

    //계약서 내용 조회

    //계약서 수정 요청

    //수정 요청 수락

    //수정 요청 거절

    //계약서 처리 내역 조회

}
