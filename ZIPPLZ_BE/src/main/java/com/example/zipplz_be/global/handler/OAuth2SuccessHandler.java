package com.example.zipplz_be.global.handler;

import com.example.zipplz_be.domain.user.dto.CustomOAuth2User;
import com.example.zipplz_be.domain.user.entity.User;
import com.example.zipplz_be.domain.user.jwt.JWTUtil;
import com.example.zipplz_be.domain.user.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        // 1. OAuth2User 가져오기
        CustomOAuth2User customOAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        String email = (String) customOAuth2User.getAttribute("email");

        // 2-1. 만약 아직 회원가입을 하지 않은 유저라면
        if (customOAuth2User.getIsNewUser()) {
            HttpSession session = request.getSession();
            session.setAttribute("email", email);
            response.sendRedirect("http://localhost:5173/member/join/common/1/extra-agree");
            return;
        }

        // 2-2. 이미 회원가입 한 유저라면
        User user = userRepository.findByEmail(email);
        int userSerial = user.getUserSerial();
        String role = user.getRole();

        String token = jwtUtil.createJwt(email, userSerial, role);

        response.addHeader("Authorization", "Bearer " + token);
        response.sendRedirect("http://localhost:5173/");
    }
}
