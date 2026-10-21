package com.campusride.dto;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
public record CreateRideRequest(@NotNull Integer creatorId,@NotNull Integer pickupLocationId,@NotNull Integer dropLocationId,@NotNull LocalDateTime startDateTime,LocalDateTime estimatedEndDateTime,String cabType,String cabProvider,@Min(1) @NotNull Integer totalSeats,@NotNull String genderPreference,@DecimalMin("0.0") BigDecimal estimatedFare,String bookingScreenshot,String notes,Boolean preBooked,String driverName,String driverPhone,String vehicleNumber,String vehicleColor) { }
