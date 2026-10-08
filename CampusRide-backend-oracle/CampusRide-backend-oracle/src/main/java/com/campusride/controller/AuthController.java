package com.campusride.controller;
import com.campusride.dto.*;import com.campusride.entity.User;import com.campusride.service.AuthService;import jakarta.validation.Valid;import org.springframework.http.*;import org.springframework.web.bind.annotation.*;import java.util.Map;
@RestController @RequestMapping("/api/auth") public class AuthController {private final AuthService service;public AuthController(AuthService service){this.service=service;}
 @PostMapping("/register") public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest r){User u=service.register(r);return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("userId",u.getUserId(),"name",u.getName(),"studentId",u.getStudentId(),"email",u.getEmail()));}
 @PostMapping("/login") public ResponseEntity<?> login(@Valid @RequestBody LoginRequest r){User u=service.login(r);return ResponseEntity.ok(Map.of("userId",u.getUserId(),"name",u.getName(),"studentId",u.getStudentId(),"email",u.getEmail()));}}
