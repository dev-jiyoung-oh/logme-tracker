package com.logme.dto;

import lombok.*;

import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignupRequest {
    @Email @NotBlank
    private String email;

    @NotBlank @Size(min=6, max=20, message = "비밀번호는 6자 이상, 20자 이하여야 합니다.")
    private String password;

    @NotBlank @Size(max=20, message = "닉네임은 20자 이하여야 합니다.")
    private String nickname;
}