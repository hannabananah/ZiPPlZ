package com.example.zipplz_be.domain.mypage.repository;

import com.example.zipplz_be.domain.mypage.entity.Wish;
import com.example.zipplz_be.domain.portfolio.dto.PortfolioJoinDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WishRepository extends JpaRepository<Wish, Integer> {
    @Query(value = "SELECT p.portfolio_serial as portfolio_serial, p.user_serial as user_serial, u.user_name as user_name, YEAR(u.birth_date) as birth_date, COALESCE(ROUND((c.communication_star+c.attitude_star+c.quality_star+c.professional_star)/4, 1), 0) as temp, p.career as career, p.field_id as field_id " +
            "FROM ( SELECT * " +
            "FROM Wish " +
            "WHERE user_serial= :user_serial and wish_type = :type ) as w " +
            "LEFT JOIN User u on u.user_serial = w.user_serial " +
            "LEFT JOIN Portfolio p on p.portfolio_serial = w.wish_serial " +
            "LEFT JOIN CustomerReview c on c.portfolio_serial = w.wish_serial;", nativeQuery = true)
    public List<PortfolioJoinDTO> getWorkerWishList(@Param("type") int type, @Param("user_serial") int user_serial);
}
