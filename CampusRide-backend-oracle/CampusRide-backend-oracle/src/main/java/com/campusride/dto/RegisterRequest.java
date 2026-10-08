package com.campusride.dto;
import jakarta.validation.constraints.*;
public record RegisterRequest(@NotBlank String name,@NotBlank String studentId,@NotBlank @Email String email,@NotBlank String phone,@NotNull String gender,@NotBlank @Size(min=6) String password) { }
