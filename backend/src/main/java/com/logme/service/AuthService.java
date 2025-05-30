package com.logme.service;

import com.logme.dto.LoginRequest;
import com.logme.dto.SignupRequest;
import com.logme.dto.AuthResponse;

public interface AuthService {
    AuthResponse signup(SignupRequest req);
    AuthResponse login(LoginRequest req);
}
