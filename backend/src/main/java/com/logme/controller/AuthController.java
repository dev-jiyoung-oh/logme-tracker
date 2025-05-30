package com.logme.controller;

import com.logme.dto.LoginRequest;
import com.logme.dto.SignupRequest;
import com.logme.dto.AuthResponse;
import com.logme.service.AuthService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody SignupRequest req) {
        log.debug(""+req);
        return ResponseEntity.ok(authService.signup(req));
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest req) {
        log.debug(""+req);
        return ResponseEntity.ok(authService.login(req));
    }
}