package com.example.zipplz_be.domain.board.controller;

import com.example.zipplz_be.domain.board.dto.*;
import com.example.zipplz_be.domain.board.service.BoardService;
import com.example.zipplz_be.domain.model.dto.ResponseDTO;
import com.example.zipplz_be.domain.portfolio.dto.PortfolioViewDTO;
import com.example.zipplz_be.domain.user.dto.CustomUserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/board")
public class BoardController {

    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @PostMapping("/user")
    public ResponseEntity<ResponseDTO<Integer>> getBoardUser(Authentication authentication, @RequestBody(required = false) Map<String, Integer> params) {
        ResponseDTO<Integer> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            int board_type = params.get("board_type");
            System.out.println(board_type);
            int board_serial = params.get("board_serial");
            System.out.println(board_serial);
            int result = boardService.getBoardUser(board_type, board_serial);
            if (result == 0) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "조회 실패 없음");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "조회 성공", result);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }

    // 질문글 추가하기
    @PostMapping("/question/add")
    public ResponseEntity<ResponseDTO<Boolean>> addQuestion(Authentication authentication, @RequestBody(required = false) Map<String, Object> params) {
        ResponseDTO<Boolean> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
            int user_serial = customUserDetails.getUserSerial();
            int board_type = 1;
            String title = (String) params.get("title");
            String board_content = (String) params.get("board_content");
            LocalDateTime board_date = LocalDateTime.now();
            int hit = 0;

            int result = boardService.addBoard(user_serial, board_type, title, board_content, board_date, hit);
            if (result == 0) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "삽입 실패 없음");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "삽입 성공", true);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }

    // 전체 질문글 가져오기
    @PostMapping("/question/list")
    public ResponseEntity<ResponseDTO<List<QuestionListDTO>>> getQuestions(@RequestBody(required = false) Map<String, Object> params) {
        ResponseDTO<List<QuestionListDTO>> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            int board_type = 1;
            List<QuestionListDTO> questions = boardService.getQuestions(board_type);

            if (questions == null) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "조회 실패 없음");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "조회 성공", questions);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }

    // 질문글 가져오기
    @PostMapping("/question/list/{boardSerial}")
    public ResponseEntity<ResponseDTO<QuestionDetailDTO>> getQuestion(@PathVariable(value = "boardSerial") int boardSerial) {
        ResponseDTO<QuestionDetailDTO> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            QuestionDetailDTO question= boardService.getQuestion(boardSerial);

            if (question == null) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "조회 실패 없음");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "조회 성공", question);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }

    // 질문글 수정하기
    @PatchMapping("/question/list/{boardSerial}")
    public ResponseEntity<ResponseDTO<Boolean>> modifyQuestion(Authentication authentication, @PathVariable(value = "boardSerial") int boardSerial, @RequestBody(required = false) Map<String, String> params) {
        ResponseDTO<Boolean> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            String title = params.get("title");
            String board_content = params.get("board_content");
            LocalDateTime board_date = LocalDateTime.now();
            int result= boardService.modifyBoard(boardSerial, title, board_content, board_date);

            if (result == 0) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "수정 실패 없음");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "수정 성공", true);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }

    // 자랑글 추가하기
    @PostMapping("/showoff/add")
    public ResponseEntity<ResponseDTO<Boolean>> addShowBoard(Authentication authentication, @RequestBody(required = false) Map<String, Object> params) {
        ResponseDTO<Boolean> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
            int user_serial = customUserDetails.getUserSerial();
            int board_type = 2;
            String title = (String) params.get("title");
            String board_content = (String) params.get("board_content");
            LocalDateTime board_date = LocalDateTime.now();
            int hit = 0;
            int addBoard_result = boardService.addBoard(user_serial, board_type, title, board_content, board_date, hit);
            int lastInsertId = boardService.getLastInsertId();

            if (addBoard_result == 0) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "보드 삽입 실패");
            } else {
                List<?> rawViews = (List<?>) params.get("selected_portfolio");

                List<PortfolioViewDTO> views = rawViews.stream()
                        .map(item -> {
                            LinkedHashMap<String, Object> map = (LinkedHashMap<String, Object>) item;
                            PortfolioViewDTO dto = new PortfolioViewDTO();
                            dto.setPortfolio_serial((Integer) map.get("portfolio_serial"));
                            // PortfolioViewDTO의 다른 필드들도 여기에 추가적으로 설정합니다.
                            return dto;
                        })
                        .collect(Collectors.toList());

                if (!views.isEmpty()) {
                    int addWorkToPortfolio_result = boardService.addBoardToPortfolio(lastInsertId, views);
                    if (addWorkToPortfolio_result == 0) {
                        status = HttpStatus.NOT_FOUND;
                        responseDTO = new ResponseDTO<>(status.value(), "관계 시공자 삽입 실패");
                    }
                }
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "삽입 성공", true);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }

    // 전체 자랑글 가져오기
    @PostMapping("/showoff/list")
    public ResponseEntity<ResponseDTO<List<ShowBoardListDTO>>> getShowBoards(@RequestBody(required = false) Map<String, Object> params) {
        ResponseDTO<List<ShowBoardListDTO>> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            int board_type = 2;
            List<ShowBoardListDTO> showboards = boardService.getShowBoards(board_type);

            if (showboards == null) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "조회 실패 없음");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "조회 성공", showboards);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }

    // 자랑글 가져오기
    @PostMapping("/showoff/list/{boardSerial}")
    public ResponseEntity<ResponseDTO<ShowBoardDetailDTO>> getShowBoard(@PathVariable(value = "boardSerial") int boardSerial) {
        ResponseDTO<ShowBoardDetailDTO> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            ShowBoardDetailDTO question= boardService.getShowBoard(boardSerial);

            if (question == null) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "조회 실패 없음");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "조회 성공", question);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }

    // 자랑글 수정하기
    @PatchMapping("/showoff/list/{boardSerial}")
    public ResponseEntity<ResponseDTO<Boolean>> modifyShowBoardh(Authentication authentication, @PathVariable(value = "boardSerial") int boardSerial, @RequestBody(required = false) Map<String, String> params) {
        ResponseDTO<Boolean> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            String title = params.get("title");
            String board_content = params.get("board_content");
            LocalDateTime board_date = LocalDateTime.now();
            int result= boardService.modifyBoard(boardSerial, title, board_content, board_date);

            if (result == 0) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "수정 실패 없음");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "수정 성공", true);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }

    // 구인구직글 추가하기
    @PostMapping("/findworker/add")
    public ResponseEntity<ResponseDTO<Boolean>> addFindWorker(Authentication authentication, @RequestBody(required = false) Map<String, Object> params) {
        ResponseDTO<Boolean> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
            int user_serial = customUserDetails.getUserSerial();
            int board_type = 3;
            String title = (String) params.get("title");
            String board_content = (String) params.get("board_content");
            LocalDateTime board_date = LocalDateTime.now();
            int hit = 0;

            int result = boardService.addBoard(user_serial, board_type, title, board_content, board_date, hit);
            if (result == 0) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "삽입 실패 없음");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "삽입 성공", true);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }

    // 전체 구인구직글 가져오기
    @PostMapping("/findworker/list")
    public ResponseEntity<ResponseDTO<List<FindWorkerListDTO>>> getFindWorkers(@RequestBody(required = false) Map<String, Object> params) {
        ResponseDTO<List<FindWorkerListDTO>> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            int board_type = 3;
            List<FindWorkerListDTO> findworkers = boardService.getFindWorkers(board_type);

            if (findworkers == null) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "조회 실패 없음");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "조회 성공", findworkers);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }

    // 구인구직글 가져오기
    @PostMapping("/findworker/list/{boardSerial}")
    public ResponseEntity<ResponseDTO<FindWorkerDetailDTO>> getFindWorker(@PathVariable(value = "boardSerial") int boardSerial) {
        ResponseDTO<FindWorkerDetailDTO> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            FindWorkerDetailDTO findworker= boardService.getFindWorker(boardSerial);

            if (findworker == null) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "조회 실패 없음");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "조회 성공", findworker);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }

    // 구인구직글 수정하기
    @PatchMapping("/findworker/list/{boardSerial}")
    public ResponseEntity<ResponseDTO<Boolean>> modifyFindWorker(Authentication authentication, @PathVariable(value = "boardSerial") int boardSerial, @RequestBody(required = false) Map<String, String> params) {
        ResponseDTO<Boolean> responseDTO;
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            String title = params.get("title");
            String board_content = params.get("board_content");
            LocalDateTime board_date = LocalDateTime.now();
            int result= boardService.modifyBoard(boardSerial, title, board_content, board_date);

            if (result == 0) {
                status = HttpStatus.NOT_FOUND;
                responseDTO = new ResponseDTO<>(status.value(), "수정 실패 없음");
            } else {
                status = HttpStatus.OK;
                responseDTO = new ResponseDTO<>(status.value(), "수정 성공", true);
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            responseDTO = new ResponseDTO<>(status.value(), e.getMessage());
        }
        return new ResponseEntity<>(responseDTO, status);
    }
}
