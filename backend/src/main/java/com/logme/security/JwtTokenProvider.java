package com.logme.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private final Key key;
    private final long validityInMs;

    // 생성자에서 초기화
    public JwtTokenProvider(
        @Value("${jwt.secret}") String secretKeyBase64,
        @Value("${jwt.validity}") long validityInMs
    ) {
        byte[] secretBytes = java.util.Base64.getDecoder().decode(secretKeyBase64);
        this.key = Keys.hmacShaKeyFor(secretBytes);
        this.validityInMs = validityInMs;
    }

    // 토큰 생성
    public String generateToken(Long userId) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + validityInMs);

        return Jwts.builder()
                .setSubject(userId.toString())
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // 토큰 파싱
    public Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
