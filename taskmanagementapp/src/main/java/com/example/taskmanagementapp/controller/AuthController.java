package com.example.taskmanagementapp.controller;

        import com.example.taskmanagementapp.dto.JwtAuthResponse;
        import com.example.taskmanagementapp.dto.LoginDto;
        import com.example.taskmanagementapp.dto.RegisterDto;
        import com.example.taskmanagementapp.service.AuthService;
        import lombok.AllArgsConstructor;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.http.HttpStatus;
        import org.springframework.http.ResponseEntity;
        import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // Register REST API
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        String response = authService.register(registerDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Login REST API
//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody LoginDto loginDto) {
//        String response = authService.login(loginDto);
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto) {
        JwtAuthResponse jwtAuthResponse = authService.login(loginDto);
        return new ResponseEntity<>(jwtAuthResponse, HttpStatus.OK);
    }

}