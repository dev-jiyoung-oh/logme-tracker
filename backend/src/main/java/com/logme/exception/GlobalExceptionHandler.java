package com.logme.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.logme.dto.ErrorResponse;

import org.springframework.http.HttpStatus;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<?> handleApiException(ApiException e) {
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(new ErrorResponse(e.getMessage()));
    }
}
