package com.logme.service.impl;

import com.logme.dto.AuthResponse;
import com.logme.dto.LoginRequest;
import com.logme.dto.SignupRequest;
import com.logme.domain.User;
import com.logme.repository.UserRepository;
import com.logme.security.JwtTokenProvider;
import com.logme.service.AuthService;

import com.logme.exception.ApiException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public AuthResponse signup(SignupRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new ApiException("이미 가입된 이메일입니다.");
        }

        User user = User.builder()
            .email(req.getEmail())
            .password(passwordEncoder.encode(req.getPassword()))
            .nickname(req.getNickname())
            .build();

        userRepository.save(user);

        String token = jwtTokenProvider.generateToken(user.getId());
        return AuthResponse.of(user, token);
    }

    @Override
    public AuthResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
            .orElse(null);
        
        if (user == null || !passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new ApiException("이메일 또는 비밀번호가 일치하지 않습니다.");
        }

        String token = jwtTokenProvider.generateToken(user.getId());
        return AuthResponse.of(user, token);
    }
}
