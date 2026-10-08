package com.campusride.dto;
import jakarta.validation.constraints.*;
public record LoginRequest(@NotBlank String identifier,@NotBlank String password) { }
