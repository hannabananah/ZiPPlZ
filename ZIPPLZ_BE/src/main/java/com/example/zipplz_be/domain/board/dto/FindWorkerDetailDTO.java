package com.example.zipplz_be.domain.board.dto;

import java.util.*;

public class FindWorkerDetailDTO {
    BoardJoinDTO board;
    List<BoardFileDTO> board_images;
    List<CommentViewDTO> comments;

    public FindWorkerDetailDTO(BoardJoinDTO board, List<BoardFileDTO> board_images, List<CommentViewDTO> comments) {
        this.board = board;
        this.board_images = board_images;
        this.comments = comments;
    }

    public BoardJoinDTO getBoard() {
        return board;
    }

    public void setBoard(BoardJoinDTO board) {
        this.board = board;
    }

    public List<BoardFileDTO> getBoard_images() {
        return board_images;
    }

    public void setBoard_images(List<BoardFileDTO> board_images) {
        this.board_images = board_images;
    }

    public List<CommentViewDTO> getComments() {
        return comments;
    }

    public void setComments(List<CommentViewDTO> comments) {
        this.comments = comments;
    }

    @Override
    public String toString() {
        return "FindWorkerDetailDTO{" +
                "board=" + board +
                ", board_images=" + board_images +
                ", comments=" + comments +
                '}';
    }
}
