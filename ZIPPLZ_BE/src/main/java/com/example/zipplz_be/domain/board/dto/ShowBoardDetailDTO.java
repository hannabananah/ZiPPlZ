package com.example.zipplz_be.domain.board.dto;

import java.util.List;

public class ShowBoardDetailDTO {
    BoardJoinDTO board;
    List<BoardFileDTO> board_images;
//    List<WorkerTagDTO> workerTagDTOS;
    List<CommentViewDTO> comments;

//    public ShowBoardDetailDTO(BoardJoinDTO board, List<BoardFileDTO> board_images, List<WorkerTagDTO> workerTagDTOS, List<CommentViewDTO> comments) {
    public ShowBoardDetailDTO(BoardJoinDTO board, List<BoardFileDTO> board_images, List<CommentViewDTO> comments) {
        this.board = board;
        this.board_images = board_images;
//        this.workerTagDTOS = workerTagDTOS;
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

//    public List<WorkerTagDTO> getWorkerTagDTOS() {
//        return workerTagDTOS;
//    }
//
//    public void setWorkerTagDTOS(List<WorkerTagDTO> workerTagDTOS) {
//        this.workerTagDTOS = workerTagDTOS;
//    }

    public List<CommentViewDTO> getComments() {
        return comments;
    }

    public void setComments(List<CommentViewDTO> comments) {
        this.comments = comments;
    }

    @Override
    public String toString() {
        return "ShowBoardDetailDTO{" +
                "board=" + board +
                ", board_images=" + board_images +
//                ", workerTagDTOS=" + workerTagDTOS +
                ", comments=" + comments +
                '}';
    }
}
