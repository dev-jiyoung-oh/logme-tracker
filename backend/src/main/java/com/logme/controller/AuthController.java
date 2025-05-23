package com.logme.controller;

import com.logme.dto.SignupRequest;
import com.logme.dto.UserResponse;
import com.logme.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserResponse> signup(@RequestBody SignupRequest req) {
        return ResponseEntity.ok(userService.signup(req));
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody SignupRequest req) {
        return ResponseEntity.ok(userService.login(req.getEmail(), req.getPassword()));
    }
}