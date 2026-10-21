package com.campusride.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name="Bookings", uniqueConstraints=@UniqueConstraint(columnNames={"RideID","UserID"}))
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Booking {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="BookingID")
    private Integer bookingId;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="RideID", nullable=false)
    private Ride ride;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="UserID", nullable=false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name="Status", nullable=false, length=20)
    private BookingStatus status;

    @Column(name="RequestedAt", nullable=false)
    private LocalDateTime requestedAt;

    @Column(name="RespondedAt")
    private LocalDateTime respondedAt;

    @Column(name="IndividualFare", precision=10, scale=2)
    private BigDecimal individualFare;

    public enum BookingStatus { Pending, Accepted, Rejected, Cancelled }

    public Booking() {}

    public Integer getBookingId() { return bookingId; }
    public void setBookingId(Integer bookingId) { this.bookingId = bookingId; }

    public Ride getRide() { return ride; }
    public void setRide(Ride ride) { this.ride = ride; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public BookingStatus getStatus() { return status; }
    public void setStatus(BookingStatus status) { this.status = status; }

    public LocalDateTime getRequestedAt() { return requestedAt; }
    public void setRequestedAt(LocalDateTime requestedAt) { this.requestedAt = requestedAt; }

    public LocalDateTime getRespondedAt() { return respondedAt; }
    public void setRespondedAt(LocalDateTime respondedAt) { this.respondedAt = respondedAt; }

    public BigDecimal getIndividualFare() { return individualFare; }
    public void setIndividualFare(BigDecimal individualFare) { this.individualFare = individualFare; }
}
