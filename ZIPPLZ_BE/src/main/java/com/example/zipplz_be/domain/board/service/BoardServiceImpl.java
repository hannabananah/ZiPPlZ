package com.example.zipplz_be.domain.board.service;

import com.example.zipplz_be.domain.board.dto.*;
import com.example.zipplz_be.domain.board.repository.BoardRepository;
import com.example.zipplz_be.domain.board.repository.CommentRepository;
import com.example.zipplz_be.domain.file.repository.FileRepository;
import com.example.zipplz_be.domain.mypage.repository.WishRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
    private final WishRepository wishRepository;
    private final FileRepository fileRepository;

    public BoardServiceImpl(BoardRepository boardRepository, CommentRepository commentRepository, WishRepository wishRepository, FileRepository fileRepository) {
        this.boardRepository = boardRepository;
        this.commentRepository = commentRepository;
        this.wishRepository = wishRepository;
        this.fileRepository = fileRepository;
    }

    @Override
    public int addBoard(int userSerial, int boardType, String title, String boardContent, LocalDateTime boardDate, int hit) {
        return boardRepository.addBoard(userSerial, boardType, title, boardContent, boardDate, hit);
    }

    @Override
    public List<QuestionListDTO> getQuestions(int boardType) {
        List<QuestionListDTO> views = new ArrayList<>();
        List<BoardJoinDTO> questions = boardRepository.getQuestions(boardType);
        for (BoardJoinDTO question : questions) {
            int comment_cnt = commentRepository.getComment(question.getBoardSerial(), -1).size();
            int wish_cnt = wishRepository.getWishCnt(question.getBoardSerial());
            QuestionListDTO view = new QuestionListDTO(question, comment_cnt, wish_cnt);
            views.add(view);
        }
        return views;
    }

    @Override
    public QuestionDetailDTO getQuestion(int boardSerial) {
        BoardJoinDTO board = boardRepository.getQuestion(boardSerial);
        List<QuestionFileDTO> board_imgs = fileRepository.getQuestionImg(boardSerial);
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
        QuestionDetailDTO question = new QuestionDetailDTO(board, board_imgs, comments);
        return question;
    }

    @Override
    public int modifyQuestion(int boardSerial, String title, String boardContent, LocalDateTime boardDate) {
        return boardRepository.modifyQuestion(boardSerial, title, boardContent, boardDate);
    }


}
