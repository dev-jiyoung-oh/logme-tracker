package com.logme.dto;

import lombok.*;

import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginRequest {
    @Email @NotBlank
    private String email;

    @NotBlank
    private String password;
}