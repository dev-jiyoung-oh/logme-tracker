package com.logme.service;

import com.logme.dto.UserResponse;

public interface UserService {
    UserResponse findById(Long id);
}