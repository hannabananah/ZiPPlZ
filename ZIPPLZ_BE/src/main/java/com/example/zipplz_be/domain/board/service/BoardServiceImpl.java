package com.example.zipplz_be.domain.board.service;

import com.example.zipplz_be.domain.board.dto.*;
import com.example.zipplz_be.domain.board.repository.BoardRepository;
import com.example.zipplz_be.domain.board.repository.CommentRepository;
import com.example.zipplz_be.domain.file.repository.FileRepository;
import com.example.zipplz_be.domain.mypage.repository.WishRepository;
import com.example.zipplz_be.domain.portfolio.dto.PortfolioJoinDTO;
import com.example.zipplz_be.domain.portfolio.dto.PortfolioViewDTO;
import com.example.zipplz_be.domain.portfolio.repository.PortfolioRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
    private final WishRepository wishRepository;
    private final FileRepository fileRepository;
    private final PortfolioRepository portfolioRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public BoardServiceImpl(BoardRepository boardRepository, CommentRepository commentRepository, WishRepository wishRepository, FileRepository fileRepository, PortfolioRepository portfolioRepository, EntityManager entityManager) {
        this.boardRepository = boardRepository;
        this.commentRepository = commentRepository;
        this.wishRepository = wishRepository;
        this.fileRepository = fileRepository;
        this.portfolioRepository = portfolioRepository;
        this.entityManager = entityManager;
    }

    @Override
    public int getBoardUser(int boardType, int boardSerial) {
        return boardRepository.getBoardUser(boardType, boardSerial);
    }

    @Override
    public int getLastInsertId() {
        return boardRepository.getLastInsertId();
    }

    @Override
    public int addBoard(int userSerial, int boardType, String title, String boardContent, LocalDateTime boardDate, int hit) {
        return boardRepository.addBoard(userSerial, boardType, title, boardContent, boardDate, hit);
    }

    @Override
    public int modifyBoard(int boardSerial, String title, String boardContent, LocalDateTime boardDate) {
        return boardRepository.modifyBoard(boardSerial, title, boardContent, boardDate);
    }

    @Override
    public List<QuestionListDTO> getQuestions(int boardType) {
        List<QuestionListDTO> views = new ArrayList<>();
        List<BoardJoinDTO> boards = boardRepository.getBoards(boardType);
        for (BoardJoinDTO board : boards) {
            int comment_cnt = commentRepository.getComment(board.getBoardSerial(), -1).size();
            int wish_cnt = wishRepository.getWishCnt(board.getBoardSerial());
            QuestionListDTO view = new QuestionListDTO(board, comment_cnt, wish_cnt);
            views.add(view);
        }
        return views;
    }

    @Override
    public QuestionDetailDTO getQuestion(int boardSerial) {
        BoardJoinDTO board = boardRepository.getBoard(boardSerial);
        List<BoardFileDTO> files = fileRepository.getBoardImg(boardSerial);
        List<CommentJoinDTO> parent_comments = commentRepository.getComment(boardSerial, -1);
        List<CommentViewDTO> comments = new ArrayList<>();
        for (CommentJoinDTO parent_comment : parent_comments) {
            List<CommentJoinDTO> child_comments = new ArrayList<>();
            if (parent_comment.getCommentSerial() != -1) {
                child_comments = commentRepository.getComment(boardSerial, parent_comment.getCommentSerial());
            }
            CommentViewDTO comment = new CommentViewDTO(parent_comment, child_comments);
            comments.add(comment);
        }
        QuestionDetailDTO question = new QuestionDetailDTO(board, files, comments);
        return question;
    }

    @Override
    public List<ShowBoardListDTO> getShowBoards(int boardType) {
        List<ShowBoardListDTO> views = new ArrayList<>();
        List<BoardJoinDTO> boards = boardRepository.getBoards(boardType);
        for (BoardJoinDTO board : boards) {
            List<BoardFileDTO> files = fileRepository.getBoardImg(board.getBoardSerial());
            String img = null;
            if (!files.isEmpty()) {
                img = files.getFirst().getSaveFile();
            }
            int comment_cnt = commentRepository.getComment(board.getBoardSerial(), -1).size();
            int wish_cnt = wishRepository.getWishCnt(board.getBoardSerial());
            ShowBoardListDTO view = new ShowBoardListDTO(board, img, comment_cnt, wish_cnt);
            views.add(view);
        }
        return views;
    }

    @Override
    public ShowBoardDetailDTO getShowBoard(int boardSerial) {
        BoardJoinDTO board = boardRepository.getBoard(boardSerial);
        List<BoardFileDTO> files = fileRepository.getBoardImg(boardSerial);
        List<PortfolioJoinDTO> tags = portfolioRepository.getPortfolioTags(boardSerial);
        
        List<CommentJoinDTO> parent_comments = commentRepository.getComment(boardSerial, -1);
        List<CommentViewDTO> comments = new ArrayList<>();
        for (CommentJoinDTO parent_comment : parent_comments) {
            List<CommentJoinDTO> child_comments = new ArrayList<>();
            if (parent_comment.getCommentSerial() != -1) {
                child_comments = commentRepository.getComment(boardSerial, parent_comment.getCommentSerial());
            }
            CommentViewDTO comment = new CommentViewDTO(parent_comment, child_comments);
            comments.add(comment);
        }
        ShowBoardDetailDTO showboard = new ShowBoardDetailDTO(board, files, tags, comments);
        return showboard;
    }

    @Override
    public List<FindWorkerListDTO> getFindWorkers(int boardType) {
        List<FindWorkerListDTO> views = new ArrayList<>();
        List<BoardJoinDTO> boards = boardRepository.getBoards(boardType);
        for (BoardJoinDTO board : boards) {
            int comment_cnt = commentRepository.getComment(board.getBoardSerial(), -1).size();
            int wish_cnt = wishRepository.getWishCnt(board.getBoardSerial());
            FindWorkerListDTO view = new FindWorkerListDTO(board, comment_cnt, wish_cnt);
            views.add(view);
        }
        return views;
    }

    @Override
    public FindWorkerDetailDTO getFindWorker(int boardSerial) {
        BoardJoinDTO board = boardRepository.getBoard(boardSerial);
        List<BoardFileDTO> files = fileRepository.getBoardImg(boardSerial);
        List<CommentJoinDTO> parent_comments = commentRepository.getComment(boardSerial, -1);
        List<CommentViewDTO> comments = new ArrayList<>();
        for (CommentJoinDTO parent_comment : parent_comments) {
            List<CommentJoinDTO> child_comments = new ArrayList<>();
            if (parent_comment.getCommentSerial() != -1) {
                child_comments = commentRepository.getComment(boardSerial, parent_comment.getCommentSerial());
            }
            CommentViewDTO comment = new CommentViewDTO(parent_comment, child_comments);
            comments.add(comment);
        }
        FindWorkerDetailDTO findworker = new FindWorkerDetailDTO(board, files, comments);
        return findworker;
    }

    @Override
    @Transactional
    public int addBoardToPortfolio(int board_serial, List<PortfolioViewDTO> views) {
        String query = "INSERT INTO BoardToPortfolio(board_serial, portfolio_serial) VALUES ";

        StringBuilder sb = new StringBuilder();
        for (PortfolioViewDTO view : views) {
            if (!sb.isEmpty()) {
                sb.append(", ");
            }
            sb.append(String.format("(%d, %d)", board_serial, view.getPortfolio_serial()));
        }

        query += sb.toString();
        System.out.println(query);
        return entityManager.createNativeQuery(query).executeUpdate();
    }
}
