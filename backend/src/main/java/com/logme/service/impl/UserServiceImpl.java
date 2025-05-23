package com.logme.service.impl;

import com.logme.dto.SignupRequest;
import com.logme.dto.UserResponse;
import com.logme.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    // @Autowired UserRepository, JwtProvider 등

    @Override
    public UserResponse signup(SignupRequest request) {
        // TODO: 구현
        return null;
    }

    @Override
    public UserResponse login(String email, String password) {
        // TODO: 구현
        return null;
    }

    @Override
    public UserResponse findById(Long id) {
        // TODO: 구현
        return null;
    }
}