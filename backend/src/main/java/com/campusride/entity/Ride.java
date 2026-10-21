package com.campusride.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name="Rides")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Ride {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="RideID")
    private Integer rideId;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="CreatorID", nullable=false)
    private User creator;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="PickupLocationID", nullable=false)
    private Location pickupLocation;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="DropLocationID", nullable=false)
    private Location dropLocation;

    @Column(name="StartDateTime", nullable=false)
    private LocalDateTime startDateTime;

    @Column(name="EstimatedEndDateTime")
    private LocalDateTime estimatedEndDateTime;

    @Column(name="CabType", length=50)
    private String cabType;

    @Column(name="CabProvider", length=50)
    private String cabProvider;

    @Column(name="TotalSeats", nullable=false)
    private Integer totalSeats;

    @Column(name="AvailableSeats", nullable=false)
    private Integer availableSeats;

    @Enumerated(EnumType.STRING)
    @Column(name="GenderPreference", length=10)
    private GenderPreference genderPreference;

    @Column(name="EstimatedFare", precision=10, scale=2)
    private BigDecimal estimatedFare;

    @Column(name="BookingScreenshot", length=500)
    private String bookingScreenshot;

    @Column(name="Notes", length=500)
    private String notes;

    public enum GenderPreference { Any, Male, Female }

    public Ride() {}

    public Integer getRideId() { return rideId; }
    public void setRideId(Integer rideId) { this.rideId = rideId; }

    public User getCreator() { return creator; }
    public void setCreator(User creator) { this.creator = creator; }

    public Location getPickupLocation() { return pickupLocation; }
    public void setPickupLocation(Location pickupLocation) { this.pickupLocation = pickupLocation; }

    public Location getDropLocation() { return dropLocation; }
    public void setDropLocation(Location dropLocation) { this.dropLocation = dropLocation; }

    public LocalDateTime getStartDateTime() { return startDateTime; }
    public void setStartDateTime(LocalDateTime startDateTime) { this.startDateTime = startDateTime; }

    public LocalDateTime getEstimatedEndDateTime() { return estimatedEndDateTime; }
    public void setEstimatedEndDateTime(LocalDateTime estimatedEndDateTime) { this.estimatedEndDateTime = estimatedEndDateTime; }

    public String getCabType() { return cabType; }
    public void setCabType(String cabType) { this.cabType = cabType; }

    public String getCabProvider() { return cabProvider; }
    public void setCabProvider(String cabProvider) { this.cabProvider = cabProvider; }

    public Integer getTotalSeats() { return totalSeats; }
    public void setTotalSeats(Integer totalSeats) { this.totalSeats = totalSeats; }

    public Integer getAvailableSeats() { return availableSeats; }
    public void setAvailableSeats(Integer availableSeats) { this.availableSeats = availableSeats; }

    public GenderPreference getGenderPreference() { return genderPreference; }
    public void setGenderPreference(GenderPreference genderPreference) { this.genderPreference = genderPreference; }

    public BigDecimal getEstimatedFare() { return estimatedFare; }
    public void setEstimatedFare(BigDecimal estimatedFare) { this.estimatedFare = estimatedFare; }

    public String getBookingScreenshot() { return bookingScreenshot; }
    public void setBookingScreenshot(String bookingScreenshot) { this.bookingScreenshot = bookingScreenshot; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
