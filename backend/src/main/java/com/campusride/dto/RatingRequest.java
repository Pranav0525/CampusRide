package com.campusride.dto;
import jakarta.validation.constraints.*;
public record RatingRequest(@NotNull Integer userId,@Min(1) @Max(5) Integer ratingValue,String comment) { }
