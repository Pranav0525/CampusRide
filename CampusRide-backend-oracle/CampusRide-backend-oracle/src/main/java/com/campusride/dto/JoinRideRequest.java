package com.campusride.dto;
import jakarta.validation.constraints.NotNull;
public record JoinRideRequest(@NotNull Integer userId) { }
