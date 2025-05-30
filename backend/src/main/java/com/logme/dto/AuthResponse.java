package com.logme.dto;

import com.logme.domain.User;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {
    private UserResponse user;
    private String token;

    public static AuthResponse of(User user, String token) {
    return AuthResponse.builder()
        .token(token)
        .user(UserResponse.from(user))
        .build();
    }

}