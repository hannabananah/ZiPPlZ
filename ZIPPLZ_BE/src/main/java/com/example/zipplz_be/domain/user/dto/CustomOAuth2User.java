package com.example.zipplz_be.domain.user.dto;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.List;
import java.util.Map;

public class CustomOAuth2User implements OAuth2User {

    private final OAuth2User oAuth2User;
    private final boolean isNewUser;

    public CustomOAuth2User(OAuth2User oAuth2User, boolean isNewUser) {
        this.oAuth2User = oAuth2User;
        this.isNewUser = isNewUser;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return oAuth2User.getAttributes();
    }

    public Object getAttribute(String attributeNameKey) {
        return oAuth2User.getAttribute(attributeNameKey);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getName() {
        return oAuth2User.getName();
    }

    public boolean getIsNewUser() {
        return isNewUser;
    }


}
