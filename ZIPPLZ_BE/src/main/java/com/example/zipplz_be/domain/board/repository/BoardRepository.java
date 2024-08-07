package com.example.zipplz_be.domain.board.repository;

import com.example.zipplz_be.domain.board.dto.BoardJoinDTO;
import com.example.zipplz_be.domain.board.entity.Board;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Board(user_serial, board_type, title, board_content, board_date, hit) " +
            "VALUES(:userSerial, :boardType, :title, :boardContent, :boardDate, :hit)", nativeQuery = true)
    int addBoard(@Param("userSerial") int userSerial,
                 @Param("boardType") int boardType,
                 @Param("title") String title,
                 @Param("boardContent") String boardContent,
                 @Param("boardDate") LocalDateTime boardDate,
                 @Param("hit") int hit);

    @Query(value = "SELECT b.*, cus.nickname " +
            "FROM ( SELECT * " +
            "FROM Board " +
            "WHERE board_type = :boardType ) b " +
            "LEFT JOIN Customer cus ON cus.user_serial = b.user_serial", nativeQuery = true)
    List<BoardJoinDTO> getQuestions(@Param("boardType") int boardType);

    @Query(value = "SELECT b.*, cus.nickname " +
            "FROM ( SELECT * " +
            "FROM Board " +
            "WHERE board_serial = :boardSerial ) b " +
            "LEFT JOIN Customer cus ON cus.user_serial = b.user_serial", nativeQuery = true)
    BoardJoinDTO getQuestion(@Param("boardSerial") int boardSerial);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Board " +
            "SET title = :title, board_content = :boardContent, board_date = :boardDate " +
            "WHERE board_serial = :boardSerial", nativeQuery = true)
    int modifyQuestion(@Param("boardSerial") int boardSerial,
                       @Param("title") String title,
                       @Param("boardContent") String boardContent,
                       @Param("boardDate") LocalDateTime boardDate);
}
