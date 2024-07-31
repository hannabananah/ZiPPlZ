package com.example.zipplz_be.domain.user.service;

import com.example.zipplz_be.domain.user.dto.CustomOAuth2User;
import com.example.zipplz_be.domain.user.dto.OAuth2UserInfoRecord;
import com.example.zipplz_be.domain.user.entity.User;
import com.example.zipplz_be.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        // 1. 유저 정보(attributes) 가져오기
        Map<String, Object> oAuth2UserAttributes = super.loadUser(userRequest).getAttributes();

        // 2. registrationId 가져오기 (third-party id)
        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        // 3. 유저 정보 dto 생성
        OAuth2UserInfoRecord oAuth2UserInfoRecord = OAuth2UserInfoRecord.of(registrationId, oAuth2UserAttributes);

        // 4. 회원가입 및 로그인
        Boolean isNewUser = saveIfNewUser(oAuth2UserInfoRecord);

        // 5. CustomOAuth2User 반환
        return new CustomOAuth2User(
                new DefaultOAuth2User(
                        Collections.singleton(new SimpleGrantedAuthority("USER")),
                        oAuth2UserAttributes,
                        "email"
                ),
                isNewUser
        );
    }

    private Boolean saveIfNewUser(OAuth2UserInfoRecord oAuth2UserInfoRecord) {
        User user;
        if (userRepository.existsByEmail(oAuth2UserInfoRecord.email())) {
            return false;
        }
        user = oAuth2UserInfoRecord.toEntity();
        userRepository.save(user);
        return true;
    }
}
