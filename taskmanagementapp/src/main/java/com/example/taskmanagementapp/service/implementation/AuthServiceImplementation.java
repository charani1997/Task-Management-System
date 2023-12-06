package com.example.taskmanagementapp.service.implementation;

import com.example.taskmanagementapp.dto.JwtAuthResponse;
import com.example.taskmanagementapp.dto.LoginDto;
import com.example.taskmanagementapp.dto.RegisterDto;
import com.example.taskmanagementapp.entity.Role;
import com.example.taskmanagementapp.entity.User;
import com.example.taskmanagementapp.exception.TaskAPIException;
import com.example.taskmanagementapp.repository.RoleRepository;
import com.example.taskmanagementapp.repository.UserRepository;
import com.example.taskmanagementapp.security.JwtTokenProvider;
import com.example.taskmanagementapp.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class AuthServiceImplementation implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Override
    public String register(RegisterDto registerDto) {
        // check username is already exists in database
 /*       if (userRepository.existsByUsername(registerDto.getName())) {
            throw new TaskAPIException(HttpStatus.BAD_REQUEST, "Username already exists");
        }
*/
        // check email is already exists in database
        if (userRepository.existsByEmail(registerDto.getEmail())) {
            throw new TaskAPIException(HttpStatus.BAD_REQUEST, "Email already exists");
        }

        User user = new User();
        //user.setName(registerDto.getName());
        //user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName("ROLE_USER");

        roles.add(userRole);
        user.setRoles(roles);
        userRepository.save(user);

        return "User Registered Successfully!.";
    }

    @Override
    public JwtAuthResponse login(LoginDto loginDto) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()
                ));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        Optional<User> userOptional = userRepository.findByEmail(loginDto.getEmail());

        String role = null;

        if (userOptional.isPresent()) {
            User loggedInUser = userOptional.get();
            Optional<Role> optionalRole = loggedInUser.getRoles().stream().findFirst();

            if (optionalRole.isPresent()) {
                Role userRole = optionalRole.get();
                role = userRole.getName();
            }
        }
        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setRole(role);
        jwtAuthResponse.setAccessToken(token);
        return jwtAuthResponse;
    }
}
