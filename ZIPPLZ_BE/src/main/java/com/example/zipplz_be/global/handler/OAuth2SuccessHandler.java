package com.example.zipplz_be.global.handler;

import com.example.zipplz_be.domain.user.entity.User;
import com.example.zipplz_be.domain.user.jwt.JWTUtil;
import com.example.zipplz_be.domain.user.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
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

        System.out.println("OAuth2 google login success!!!!!!");
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        User user = userRepository.findByEmail(email);
        int userSerial = user.getUserSerial();

        String token = jwtUtil.createJwt(email, userSerial);

        response.addHeader("Authorization", "Bearer " + token);
        response.sendRedirect("http://localhost:5173/member/join/common/1/extrainfo");
        System.out.println(token);
    }
}
