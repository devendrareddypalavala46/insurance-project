package com.deva.insurance.controller;

import com.deva.insurance.dto.LoginRequest;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {

        // 🔥 Simple hardcoded login (for now)
        if ("admin".equals(request.getUsername()) &&
                "admin123".equals(request.getPassword())) {

            return "Login Successful";
        }

        throw new RuntimeException("Invalid credentials");
    }
}