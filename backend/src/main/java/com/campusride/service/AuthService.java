package com.campusride.service;
import com.campusride.dto.*;
import com.campusride.entity.User;
import com.campusride.exception.BadRequestException;
import com.campusride.exception.NotFoundException;
import com.campusride.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@Service
public class AuthService {
 private final UserRepository users; private final PasswordEncoder encoder;
 public AuthService(UserRepository users,PasswordEncoder encoder){this.users=users;this.encoder=encoder;}
 public User register(RegisterRequest r){
   if(users.existsByEmail(r.email())) throw new BadRequestException("Email already registered");
   if(users.existsByStudentId(r.studentId())) throw new BadRequestException("Student ID already registered");
   User u=new User(); u.setName(r.name());u.setStudentId(r.studentId());u.setEmail(r.email());u.setPhone(r.phone());u.setGender(User.Gender.valueOf(r.gender()));u.setPasswordHash(encoder.encode(r.password())); return users.save(u);
 }
 public User login(LoginRequest r){
   User u=users.findByEmail(r.identifier()).or(()->users.findByStudentId(r.identifier())).orElseThrow(()->new NotFoundException("User not found"));
   if(u.getPasswordHash()==null || !encoder.matches(r.password(),u.getPasswordHash())) throw new BadRequestException("Invalid credentials");
   return u;
 }
}
