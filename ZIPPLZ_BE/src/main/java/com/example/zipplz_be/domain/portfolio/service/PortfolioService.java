package com.example.zipplz_be.domain.portfolio.service;

import com.example.zipplz_be.domain.file.entity.File;
import com.example.zipplz_be.domain.file.repository.FileRepository;
import com.example.zipplz_be.domain.model.PlanFileRelation;
import com.example.zipplz_be.domain.model.entity.Field;
import com.example.zipplz_be.domain.model.entity.Local;
import com.example.zipplz_be.domain.model.repository.LocalRepository;
import com.example.zipplz_be.domain.model.repository.PlanFileRelationRepository;
import com.example.zipplz_be.domain.portfolio.dto.*;
import com.example.zipplz_be.domain.portfolio.entity.CustomerReview;
import com.example.zipplz_be.domain.portfolio.entity.Portfolio;
import com.example.zipplz_be.domain.portfolio.exception.CustomerReviewException;
import com.example.zipplz_be.domain.portfolio.exception.PortfolioNotFoundException;
import com.example.zipplz_be.domain.portfolio.exception.UnauthorizedUserException;
import com.example.zipplz_be.domain.portfolio.repository.CustomerReviewRepository;
import com.example.zipplz_be.domain.portfolio.repository.PortfolioRepository;
import com.example.zipplz_be.domain.schedule.entity.Plan;
import com.example.zipplz_be.domain.schedule.entity.Work;
import com.example.zipplz_be.domain.schedule.repository.PlanRepository;
import com.example.zipplz_be.domain.schedule.repository.WorkRepository;
import com.example.zipplz_be.domain.user.dto.CustomUserDetails;
import com.example.zipplz_be.domain.user.entity.Customer;
import com.example.zipplz_be.domain.user.entity.User;
import com.example.zipplz_be.domain.user.exception.UserNotFoundException;
import com.example.zipplz_be.domain.user.repository.CustomerRepository;
import com.example.zipplz_be.domain.user.repository.UserRepository;
import com.example.zipplz_be.domain.user.repository.WorkerRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.OptionalDouble;

import com.example.zipplz_be.domain.user.entity.Worker;


@Service
public class PortfolioService {
    private final CustomerReviewService customerReviewService;

    private final PortfolioRepository portfolioRepository;
    private final WorkerRepository workerRepository;
    private final UserRepository userRepository;
    private final FileRepository fileRepository;
    private final LocalRepository localRepository;
    private final WorkRepository workRepository;
    private final PlanRepository planRepository;
    private final CustomerRepository customerRepository;
    private final PlanFileRelationRepository planFileRelationRepository;
    private final CustomerReviewRepository customerReviewRepository;

    PortfolioService(CustomerReviewRepository customerReviewRepository, CustomerReviewService customerReviewService, PlanFileRelationRepository planFileRelationRepository,CustomerRepository customerRepository,PlanRepository planRepository,WorkRepository workRepository, LocalRepository localRepository, FileRepository fileRepository,UserRepository userRepository, PortfolioRepository portfolioRepository, WorkerRepository workerRepository) {
        this.customerReviewRepository = customerReviewRepository;
        this.customerReviewService = customerReviewService;
        this.planFileRelationRepository = planFileRelationRepository;
        this.customerRepository = customerRepository;
        this.planRepository = planRepository;
        this.workRepository = workRepository;
        this.localRepository = localRepository;
        this.fileRepository = fileRepository;
        this.userRepository = userRepository;
        this.portfolioRepository = portfolioRepository;
        this.workerRepository = workerRepository;
    }

    public Portfolio createPortfolio(Worker worker, Field field) {

        Portfolio portfolio = Portfolio.builder()
                .worker(worker)
                .field(field).build();
        Portfolio savedPortfolio = portfolioRepository.save(portfolio);

        return savedPortfolio;
    }

    @Transactional
    public List<PortfolioListDTO> getPortfolioListService(int userSerial) {
        User user = userRepository.findByUserSerial(userSerial);
        Worker worker = workerRepository.findByUserSerial(user);

        if(worker == null) {
            throw new UserNotFoundException("해당 유저 연번은 유효하지 않습니다.");
        }

        List<Portfolio> portfolioList = portfolioRepository.findByWorker(worker);
        List<PortfolioListDTO> portfolioListDTOList = new ArrayList<>();

        for(Portfolio portfolio: portfolioList) {
            PortfolioListDTO portfolioListDTO = PortfolioListDTO.builder()
                    .fieldId(portfolio.getFieldId())
                    .portfolioSerial(portfolio.getPortfolioSerial())
                    .build();

            portfolioListDTOList.add(portfolioListDTO);
        }

        return portfolioListDTOList;
    }

    @Transactional
    public PortfolioInfoDTO getPortfolioInfoService(int portfolioSerial) {
        Portfolio portfolio = portfolioRepository.findByPortfolioSerial(portfolioSerial);

        //포트폴리오 연번 유효성 검사
        if(portfolio == null) {
            throw new PortfolioNotFoundException("해당 포트폴리오는 존재하지 않습니다.");
        }

        Worker worker = portfolio.getWorker();
        PortfolioWorkerDTO portfolioWorkerDTO = PortfolioWorkerDTO.builder()
                .workerSerial(worker.getWorkerSerial())
                .businessNumber(worker.getBusinessNumber())
                .certificatedBadge(worker.getCertificatedBadge())
                .hasAsBadge(worker.getHasAsBadge())
                .companyAddress(worker.getCompanyAddress())
                .company(worker.getCompany())
                .build();


        User user = worker.getUserSerial();
        List<PortfolioFileDTO> imageList = fileRepository.getImg(portfolioSerial);
        File userProfile = fileRepository.findByFileSerial(user.getFileSerial().getFileSerial());
        List<String> localList = localRepository.getLocalNames(user.getUserSerial());
        PortfolioUserDTO portfolioUserDTO = PortfolioUserDTO.builder()
                .userSerial(user.getUserSerial())
                .birthDate(user.getBirthDate())
                .userName(user.getUserName())
                .tel(user.getTel())
                .email(user.getEmail())
                .fileSerial(userProfile.getFileSerial()).build();


        //포트폴리오 번호로 포트폴리오에서 필요한 정보들 찾고 DTO 리턴
        PortfolioInfoDTO portfolioInfoDTO = PortfolioInfoDTO.builder()
                .asPeriod(portfolio.getAsPeriod())
                .career(portfolio.getCareer())
                .workCount(portfolio.getWorkCount())
                .publicRelation(portfolio.getPublicRelation())
                .user(portfolioUserDTO)
                .worker(portfolioWorkerDTO)
                .userProfile(userProfile)
                .imageList(imageList)
                .localList(localList).build();

        return portfolioInfoDTO;
    }

    @Transactional
    public List<PortfolioWorkListDTO> getWorkerScheduleService(int workerSerial) {
        Worker worker = workerRepository.findByWorkerSerial(workerSerial);

        if(worker== null) throw new UserNotFoundException("해당 사용자가 존재하지 않습니다.");

        //해당 시공자가 맡은 공종 목록 조회
        List<Work> workList = workRepository.findByWorkerSerial(worker);
        List<PortfolioWorkListDTO> portfolioWorkListDTOList = new ArrayList<>();

        for(Work work: workList) {
            PortfolioWorkListDTO portfolioWorkListDTO = PortfolioWorkListDTO.builder()
                    .workSerial(work.getWorkSerial())
                    .endDate(convertTimestamp(work.getEndDate()))
                    .startDate(convertTimestamp(work.getStartDate()))
                    .workerSerial(work.getWorkerSerial().getWorkerSerial())
                    .fieldName(work.getFieldName())
                    .build();

            portfolioWorkListDTOList.add(portfolioWorkListDTO);
        }

        return portfolioWorkListDTOList;
    }

    @Transactional
    public PortfolioWorkDetailDTO getWorkerScheduleInfoService(int userSerial, int workerSerial, int workSerial) {
        Worker worker = workerRepository.findByWorkerSerial(workerSerial);


        if(worker == null) {
            throw new UserNotFoundException("유효하지 않은 시공자 연번입니다.");
        }

        User user = userRepository.findByUserSerial(userSerial);
        Worker loginWorker = workerRepository.findByUserSerial(user);

        if(loginWorker== null || loginWorker.getWorkerSerial() != worker.getWorkerSerial()) {
            throw new UnauthorizedUserException("현재 로그인한 유저가 시공자 본인이 아닙니다.");
        }

        Work work = workRepository.findByWorkSerial(workSerial);
        Plan plan = planRepository.findByPlanSerial(work.getPlanSerial().getPlanSerial());
        Customer customer = customerRepository.findByCustomerSerial(plan.getCustomerSerial().getCustomerSerial());
        List<File> planImageList = new ArrayList<>();

        //planFileRelation에서 계획 연번이랑 동일한 객체들을 모두 뽑고,
        //그 객체의 파일 연번과 동일한 파일을 뽑아 하나씩 planImageList에 추가한다.

        List<PlanFileRelation> planFileRelationList = planFileRelationRepository.findByPlanSerial(plan);

        for(PlanFileRelation planFileRelation: planFileRelationList) {
            File file = fileRepository.findByFileSerial(planFileRelation.getFileSerial().getFileSerial());

            planImageList.add(file);
        }

        PortfolioWorkDetailDTO portfolioWorkDetailDTO = PortfolioWorkDetailDTO.builder()
                .startDate(convertTimestamp(work.getStartDate()))
                .endDate(convertTimestamp(work.getEndDate()))
                .workPrice(work.getWorkPrice())
                .workContent(work.getWorkContent())
                .planSerial(plan.getPlanSerial())
                .address(plan.getAddress())
                .sharedContents(plan.getSharedContents())
                .nickname(customer.getNickname())
                .planImageList(planImageList)
                .build();

        return portfolioWorkDetailDTO;
    }

    @Transactional
    public PortfolioReviewDTO getPortfolioReviewService(int portfolioSerial) {
        Portfolio portfolio = portfolioRepository.findByPortfolioSerial(portfolioSerial);

        //포트폴리오 연번 유효성 검사
        if(portfolio == null) {
            throw new PortfolioNotFoundException("해당 포트폴리오는 존재하지 않습니다.");
        }

        User user = userRepository.findByUserSerial(portfolio.getWorker().getUserSerial().getUserSerial());

        // 포트폴리오 시리얼로 모든 리뷰 가져오기
        List<CustomerReview> reviews = customerReviewRepository.findAllByPortfolioSerial(portfolio);

        // communicationStar 평균 계산
        OptionalDouble averageCommunicationStar = getAverageCommunicationStar(reviews);

        // attitudeStar 평균 계산
        OptionalDouble averageAttitudeStar = getAverageAttitudeStar(reviews);

        // qualityStar 평균 계산
        OptionalDouble averageQualityStar = getAverageQualityStar(reviews);

        // professionalStar 평균 계산
        OptionalDouble averageProfessionalStar = getAverageProfessionalStar(reviews);

        double temperature = portfolio.getTemperature();

        List<CustomerReviewDTO> reviewDTOS = new ArrayList<>();
        for(CustomerReview customerReview: reviews) {
            int professionalStar = customerReview.getProfessionalStar();
            int attitudeStar = customerReview.getAttitudeStar();
            int qualityStart = customerReview.getQualityStar();
            int communicationStar = customerReview.getCommunicationStar();

            double averageStar = (double)(professionalStar + attitudeStar + qualityStart + communicationStar) /4;

            Customer customer =  customerReview.getCustomerSerial();

            CustomerReviewDTO customerReviewDTO = CustomerReviewDTO.builder()
                    .customerReviewSerial(customerReview.getCustomerReviewSerial())
                    .customerNickname(customer.getNickname())
                    .customerReviewContent(customerReview.getCustomerReviewContent())
                    .customerReviewDate(convertTimestamp(customerReview.getCustomerReviewDate()))
                    .isVisible(customerReview.getIsVisible())
                    .reviewComment(customerReview.getReviewComment())
                    .averageStar(averageStar)
                    .build();

            reviewDTOS.add(customerReviewDTO);
        }

        PortfolioReviewDTO portfolioReviewDTO = PortfolioReviewDTO.builder()
                .workerTemperature(temperature)
                .workerName(user.getUserName())
                .averageCommunicationStar(averageCommunicationStar.isPresent() ? averageCommunicationStar.getAsDouble() : 0.0)
                .averageAttitudeStar(averageAttitudeStar.isPresent() ? averageAttitudeStar.getAsDouble() : 0.0)
                .averageProfessionalStar(averageProfessionalStar.isPresent() ? averageProfessionalStar.getAsDouble() : 0.0)
                .averageQualityStar(averageQualityStar.isPresent() ? averageQualityStar.getAsDouble() : 0.0)
                .reviewList(reviewDTOS)
                .build();

        return portfolioReviewDTO;
    }

    @Transactional
    public void insertReviewCommentService(int userSerial, int customerReviewSerial, Map<String, Object> params) {
        CustomerReview customerReview = customerReviewRepository.findByCustomerReviewSerial(customerReviewSerial);

        //리뷰 연번 유효성 검사
        if(customerReview == null) {
            throw new CustomerReviewException("해당 리뷰는 존재하지 않습니다.");
        }
        if(customerReview.getReviewComment() != null) {
            throw new CustomerReviewException("이미 사장님 댓글을 작성했습니다.");
        }

        Portfolio portfolio = portfolioRepository.findByPortfolioSerial(customerReview.getPortfolioSerial().getPortfolioSerial());

        if(portfolio.getWorker().getUserSerial().getUserSerial() != userSerial) {
            throw new UnauthorizedUserException("댓글을 달 권한이 없습니다.");
        }

        customerReview.setReviewComment((String) params.get("reviewComment"));

        customerReviewRepository.save(customerReview);
    }

    private OptionalDouble getAverageProfessionalStar(List<CustomerReview> reviews) {
        OptionalDouble averageProfessionalStart = reviews.stream()
                .mapToInt(CustomerReview::getProfessionalStar)
                .average();

        return averageProfessionalStart;
    }

    private OptionalDouble getAverageQualityStar(List<CustomerReview> reviews) {
        OptionalDouble averageQualityStar = reviews.stream()
                .mapToInt(CustomerReview::getQualityStar)
                .average();

        return averageQualityStar;
    }

    public OptionalDouble getAverageCommunicationStar(List<CustomerReview> reviews) {
        OptionalDouble averageCommunicationStar = reviews.stream()
                .mapToInt(CustomerReview::getCommunicationStar)
                .average();

        return averageCommunicationStar;
    }

    public OptionalDouble getAverageAttitudeStar(List<CustomerReview> reviews) {
        OptionalDouble averageAttitudeStar = reviews.stream()
                .mapToInt(CustomerReview::getAttitudeStar)
                .average();

        return averageAttitudeStar;
    }


    //timestamp -> String
    public String convertTimestamp(Timestamp timestamp) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

        return timestamp.toLocalDateTime().format(formatter);
    }


    //연번 가져오기
    public int getUserSerial(Authentication authentication) {
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        return customUserDetails.getUserSerial();
    }

    @Transactional
    public void modifyPortfolioService(int userSerial, int portfolioSerial, Map<String, Object> params) {
        Portfolio portfolio = portfolioRepository.findByPortfolioSerial(portfolioSerial);

        if(portfolio == null) {
            throw new PortfolioNotFoundException("유효하지 않은 포트폴리오 연번입니다.");
        }
        Worker worker = portfolio.getWorker();

        if(worker.getUserSerial().getUserSerial() != userSerial) {
            throw new UnauthorizedUserException("수정 권한이 없습니다.");
        }

        portfolio.setPublicRelation((String) params.get("publicRelation"));
        portfolio.setAsPeriod((Integer) params.get("asPeriod"));
        portfolio.setCareer((Integer) params.get("career"));

        worker.setCompany((String) params.get("company"));
        worker.setCompanyAddress((String) params.get("companyAddress"));
        worker.setBusinessNumber((String) params.get("businessNumber"));

        portfolioRepository.save(portfolio);
        workerRepository.save(worker);
    }

    @Transactional
    public void deletePortfolioService(int userSerial, int portfolioSerial) {
        Portfolio portfolio = portfolioRepository.findByPortfolioSerial(portfolioSerial);

        if(portfolio == null) {
            throw new PortfolioNotFoundException("유효하지 않은 포트폴리오 연번입니다.");
        }

        Worker worker = portfolio.getWorker();

        if(worker.getUserSerial().getUserSerial() != userSerial) {
            throw new UnauthorizedUserException("삭제 권한이 없습니다.");
        }

        portfolioRepository.delete(portfolio);
    }
}
