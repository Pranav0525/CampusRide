package com.campusride.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity @Table(name="Rides") @Getter @Setter @NoArgsConstructor @AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Ride {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(name="RideID") private Integer rideId;
    @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="CreatorID", nullable=false) private User creator;
    @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="PickupLocationID", nullable=false) private Location pickupLocation;
    @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="DropLocationID", nullable=false) private Location dropLocation;
    @Column(name="StartDateTime", nullable=false) private LocalDateTime startDateTime;
    @Column(name="EstimatedEndDateTime") private LocalDateTime estimatedEndDateTime;
    @Column(name="CabType", length=50) private String cabType;
    @Column(name="CabProvider", length=50) private String cabProvider;
    @Column(name="TotalSeats", nullable=false) private Integer totalSeats;
    @Column(name="AvailableSeats", nullable=false) private Integer availableSeats;
    @Enumerated(EnumType.STRING) @Column(name="GenderPreference", length=10) private GenderPreference genderPreference;
    @Column(name="EstimatedFare", precision=10, scale=2) private BigDecimal estimatedFare;
    @Column(name="BookingScreenshot", length=500) private String bookingScreenshot;
    @Column(name="Notes", length=500) private String notes;
    public enum GenderPreference { Any, Male, Female }
}
