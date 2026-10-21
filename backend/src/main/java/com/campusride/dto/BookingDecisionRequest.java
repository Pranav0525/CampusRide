package com.campusride.dto;
import jakarta.validation.constraints.NotNull;
public record BookingDecisionRequest(@NotNull Integer creatorId) { }
