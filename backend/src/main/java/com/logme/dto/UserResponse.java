package com.logme.dto;

import lombok.Data;

@Data
public class UserResponse {
    private Long id;
    private String email;
    private String nickname;
}