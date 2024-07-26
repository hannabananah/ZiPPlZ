package com.example.zipplz_be.domain.user.jwt;

import com.example.zipplz_be.domain.user.entity.User;
import com.example.zipplz_be.domain.user.repository.UserRepository;
import com.example.zipplz_be.domain.user.service.CustomUserDetailsService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JWTUtil {

    private final CustomUserDetailsService customUserDetailsService;
    private final UserRepository userRepository;
    private SecretKey secretKey;

    public JWTUtil(@Value("${spring.jwt.secret}") String secret, CustomUserDetailsService customUserDetailsService, UserRepository userRepository) {
        secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
        this.customUserDetailsService = customUserDetailsService;
        this.userRepository = userRepository;
    }

    public String getEmail(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("email", String.class);
    }

    public Boolean isExpired(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration().before(new Date());
    }

    public String createJwt(String email, Long expiredMs) {
        return Jwts.builder()
                .claim("email", email)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(secretKey, Jwts.SIG.HS256)
                .compact();
    }

    // 토큰에서 email 정보 추출
    private String extractEmailFromJwt(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.get("email", String.class);
    }

    // 토큰에서 email 정보 추출 후, userSerial 구하기
    public int getUserSerialFromJwt(String token) {

        String email = extractEmailFromJwt(token);

        if (!userRepository.existsByEmail(email)) {
            throw new UsernameNotFoundException("해당 유저를 찾을 수 없습니다.");
        }

        User user = userRepository.findByEmail(email);
        return user.getUserSerial();
    }

    // 토큰 유효성 + 만료일자 확인 기능 추가 해야 함!

}
