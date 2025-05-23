package com.logme.service;

import com.logme.dto.SignupRequest;
import com.logme.dto.UserResponse;

public interface UserService {
    UserResponse signup(SignupRequest request);
    UserResponse login(String email, String password);
    UserResponse findById(Long id);
}