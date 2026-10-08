package com.campusride.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity @Table(name="Bookings", uniqueConstraints=@UniqueConstraint(columnNames={"RideID","UserID"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Booking {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(name="BookingID") private Integer bookingId;
    @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="RideID", nullable=false) private Ride ride;
    @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="UserID", nullable=false) private User user;
    @Enumerated(EnumType.STRING) @Column(name="Status", nullable=false, length=20) private BookingStatus status;
    @Column(name="RequestedAt", nullable=false) private LocalDateTime requestedAt;
    @Column(name="RespondedAt") private LocalDateTime respondedAt;
    @Column(name="IndividualFare", precision=10, scale=2) private BigDecimal individualFare;
    public enum BookingStatus { Pending, Accepted, Rejected, Cancelled }
}
