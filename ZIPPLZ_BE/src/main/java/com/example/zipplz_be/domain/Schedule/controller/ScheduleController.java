package com.example.zipplz_be.domain.Schedule.controller;

import com.example.zipplz_be.domain.Schedule.entity.Plan;
import com.example.zipplz_be.domain.Schedule.entity.Work;
import com.example.zipplz_be.domain.Schedule.exception.CustomerNotFoundException;
import com.example.zipplz_be.domain.Schedule.exception.DuplicateFieldException;
import com.example.zipplz_be.domain.Schedule.exception.PlanNotFoundException;
import com.example.zipplz_be.domain.Schedule.exception.WorkException;
import com.example.zipplz_be.domain.Schedule.service.PlanService;
import com.example.zipplz_be.domain.Schedule.service.WorkService;
import com.example.zipplz_be.domain.model.dto.ResponseDTO;
import com.example.zipplz_be.domain.portfolio.entity.CustomerReview;
import com.example.zipplz_be.domain.user.dto.CustomUserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/schedule")
public class ScheduleController {
    private final PlanService planService;
    private final WorkService workService;

    public ScheduleController(PlanService planService, WorkService workService) {
        this.planService = planService;
        this.workService = workService;
    }

    //계획 조회
    @GetMapping("/plans")
    public ResponseEntity<ResponseDTO<?>> getPlan(Authentication authentication) {
        //plan 테이블에서 현재 로그인한 유저의 계획 정보들 모두 가져오기
        ResponseDTO<?> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            List<Plan> planList = planService.getPlanService(getUserSerial(authentication));

            status = HttpStatus.OK;
            responseDTO = new ResponseDTO<>(status.value(), "조회 성공", planList);
        } catch (CustomerNotFoundException e) {
            status = HttpStatus.NOT_FOUND;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }


    //공종 추가
    @PostMapping("/plans/{planSerial}/works")
    public ResponseEntity<ResponseDTO<?>> insertWork(@PathVariable("planSerial") int planSerial, @RequestBody Map<String, Object> params) {
        //이름 검색해보고 없으면 0으로 넣고, 있으면 field_code 설정해주면 됨
        //worker serial이 없으면 빈 시공 띄우면 됨!

        ResponseDTO<?> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            workService.insertWorkService(planSerial, params);

            status = HttpStatus.CREATED;
            responseDTO = new ResponseDTO<>(status.value(), "삽입 성공");
        } catch(PlanNotFoundException e) {
            status = HttpStatus.NOT_FOUND;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch(DuplicateFieldException e) {
            status = HttpStatus.BAD_REQUEST;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch(Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }


    //공종 목록 조회(페이징)
    @GetMapping("/plans/{planSerial}/works")
    public ResponseEntity<ResponseDTO<?>> getWorkList(@PathVariable("planSerial") int planSerial, @RequestParam Map<String, Object> params) {
        ResponseDTO<?> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            //공종 테이블에서 해당 planSerial과 일치하는 목록들을 모두 가져오고, 페이징 처리.
            List<Work> workList = workService.getWorkListService(planSerial, params);
            status = HttpStatus.OK;
            responseDTO = new ResponseDTO<>(status.value(),"조회 성공", workList);
        } catch(PlanNotFoundException e) {
            status = HttpStatus.NOT_FOUND;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch(Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }

    //계획 추가
    @PostMapping("/plans")
    public ResponseEntity<ResponseDTO<?>> insertPlan(Authentication authentication, @RequestBody Map<String, Object> params) {
        ResponseDTO<?> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            int userSerial = getUserSerial(authentication);

            planService.insertPlanService(userSerial, params);

            status = HttpStatus.CREATED;
            responseDTO = new ResponseDTO<>(status.value(), "추가 성공");
        } catch(Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }

    //총 견적 조회
    @GetMapping("/plans/{planSerial}/price")
    public ResponseEntity<ResponseDTO<?>> getTotalPrice(@PathVariable int planSerial) {
        //해당 planSerial과 일치하는 공종들의 work_price 총합을 return한다!
        ResponseDTO<?> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            Integer totalPrice = workService.getTotalPriceService(planSerial);

            status= HttpStatus.OK;
            responseDTO = new ResponseDTO<>(status.value(), "조회 성공!", totalPrice);
        } catch(PlanNotFoundException e) {
            status = HttpStatus.NOT_FOUND;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch(Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }

    //계획 수정하기
    @PatchMapping("/plans/{planSerial}")
    public ResponseEntity<?> modifyPlan(Authentication authentication, @PathVariable int planSerial, @RequestBody Map<String, Object> params) {
        ResponseDTO<?> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            planService.modifyPlanService(getUserSerial(authentication), planSerial, params);

            status= HttpStatus.OK;
            responseDTO = new ResponseDTO<>(status.value(), "수정 성공!");
        }catch(PlanNotFoundException e) {
            status = HttpStatus.NOT_FOUND;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch(CustomerNotFoundException e) {
            status = HttpStatus.UNAUTHORIZED;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch(Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }

    //공종별 메모 수정하기 -> 이외 공정 정보는 협의가 필요하므로, 나머지 계약 관련 수정 사항은 계약 수정 요청하기로 가야 함
    @PatchMapping("/plans/{planSerial}/works/{workSerial}")
    public ResponseEntity<?> modifyWorkMemo(Authentication authentication, @PathVariable int planSerial, @PathVariable int workSerial, @RequestBody Map<String, Object> params) {
        ResponseDTO<?> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            workService.modifyWorkMemoService(getUserSerial(authentication), planSerial,workSerial, params);

            status= HttpStatus.OK;
            responseDTO = new ResponseDTO<>(status.value(), "수정 성공!");
        }catch(WorkException e) {
            status = HttpStatus.BAD_REQUEST;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch(PlanNotFoundException e) {
            status = HttpStatus.NOT_FOUND;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch(CustomerNotFoundException e) {
            status = HttpStatus.UNAUTHORIZED;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch(Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }

    //빈 공종 삭제하기 -> 이미 누군가 배정돼있다면 막 삭제 불가능(계약 파기 api로 가야 함), 누군가 배정돼있지 않을 경우 삭제.
    @DeleteMapping("/plans/{planSerial}/works/{workSerial}")
    public ResponseEntity<?> deleteWork(Authentication authentication, @PathVariable int planSerial, @PathVariable int workSerial) {
        ResponseDTO<?> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            workService.deleteWorkService(getUserSerial(authentication), planSerial,workSerial);

            status= HttpStatus.OK;
            responseDTO = new ResponseDTO<>(status.value(), "삭제 성공!");
        }catch(WorkException e) {
            status = HttpStatus.BAD_REQUEST;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch(PlanNotFoundException e) {
            status = HttpStatus.NOT_FOUND;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch(CustomerNotFoundException e) {
            status = HttpStatus.UNAUTHORIZED;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch(Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }

    //계획 삭제 -> 누군가 배정된 공종이 하나라도 있다면 삭제 불가능.(내부의 공종들이 다 빈 상태라면 삭제 가능!!)
    @DeleteMapping("/plans/{planSerial}")
    public ResponseEntity<?> deletePlan(Authentication authentication, @PathVariable int planSerial) {
        ResponseDTO<?> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            planService.deletePlanService(getUserSerial(authentication), planSerial);

            status= HttpStatus.OK;
            responseDTO = new ResponseDTO<>(status.value(), "삭제 성공!");
        }catch(WorkException e) {
            status = HttpStatus.BAD_REQUEST;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch(PlanNotFoundException e) {
            status = HttpStatus.NOT_FOUND;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch(CustomerNotFoundException e) {
            status = HttpStatus.UNAUTHORIZED;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch(Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }

    //리뷰 작성하기
    @PostMapping("/plans/{planSerial}/works/{workSerial}/review")
    public ResponseEntity<?> createReview(Authentication authentication, @PathVariable int planSerial, @PathVariable int workSerial, @RequestBody Map<String, Object> params) {
        //시공자 댓글은 null로 두기
        ResponseDTO<?> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            CustomerReview customerReview = workService.createReviewService(getUserSerial(authentication), planSerial, workSerial, params);

            status= HttpStatus.CREATED;
            responseDTO = new ResponseDTO<>(status.value(), "리뷰 작성 성공!", customerReview);
        }catch(WorkException e) {
            status = HttpStatus.BAD_REQUEST;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch(PlanNotFoundException e) {
            status = HttpStatus.NOT_FOUND;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch(CustomerNotFoundException e) {
            status = HttpStatus.UNAUTHORIZED;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        } catch(Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }

        return new ResponseEntity<>(responseDTO, status);
    }

    //계획, 커스텀 공종 만들기, 공유사항이나 메모 수정 시 유효성검사 필요!!!!!!!!!!!!!!
    //평면도 가져오기
    //공유 문서에 이미지 넣기
    //공유 문서의 이미지 조회하기
    //영상 다운로드



    //계약서 조회하기
    //계약서 수정하고 수정요청 보내기(수정 요청 테이블이랑 계약서 테이블도 필요함)

    //연번 가져오기
    public int getUserSerial(Authentication authentication) {
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        return customUserDetails.getUserSerial();
    }
}

