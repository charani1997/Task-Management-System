package com.example.taskmanagementapp.service;


import com.example.taskmanagementapp.dto.JwtAuthResponse;
import com.example.taskmanagementapp.dto.LoginDto;
import com.example.taskmanagementapp.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);

    //String login(LoginDto loginDto);
    JwtAuthResponse login(LoginDto loginDto);
}