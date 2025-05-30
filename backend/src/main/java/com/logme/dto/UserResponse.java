package com.logme.dto;

import com.logme.domain.User;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class UserResponse {
    private Long id;
    private String email;
    private String nickname;

    public static UserResponse from(User user) {
        return UserResponse.builder()
        .id(user.getId())
        .email(user.getEmail())
        .nickname(user.getNickname())
        .build();
    }
}