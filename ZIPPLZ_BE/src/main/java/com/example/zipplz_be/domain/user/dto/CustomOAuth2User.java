package com.example.zipplz_be.domain.user.dto;

import com.example.zipplz_be.domain.user.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

public record CustomOAuth2User(
        User user,
        boolean isNewUser,
        Map<String, Object> attributes,
        String attributeKey) implements OAuth2User, UserDetails {

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(
                new GrantedAuthority() {
                    @Override
                    public String getAuthority() {
                        return "USER";
                    }
                }
        );
    }

    @Override
    public Map<String, Object> getAttributes() {
        return Map.of();
    }

    public int getUserSerial() {
        return user.getUserSerial();
    }

    public String getRole() {
        return user.getRole();
    }

    @Override
    public boolean isNewUser() {
        return isNewUser;
    }

    @Override
    public String getName() {
        return attributes.get(attributeKey).toString();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }
}
