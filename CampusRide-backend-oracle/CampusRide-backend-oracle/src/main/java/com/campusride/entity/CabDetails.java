package com.campusride.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name="CabDetails") @Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class CabDetails {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(name="CabDetailID") private Integer cabDetailId;
    @OneToOne(fetch=FetchType.LAZY) @JoinColumn(name="RideID", nullable=false, unique=true) private Ride ride;
    @Column(name="CabProvider", length=50) private String cabProvider;
    @Column(name="CabType", length=50) private String cabType;
    @Column(name="BookingReference", length=100) private String bookingReference;
    @Column(name="BookingStatus", length=20) private String bookingStatus;
    @Column(name="DriverName", length=100) private String driverName;
    @Column(name="DriverPhone", length=15) private String driverPhone;
    @Column(name="VehicleNumber", length=30) private String vehicleNumber;
    @Column(name="VehicleColor", length=30) private String vehicleColor;
    @Column(name="ScreenshotPath", length=500) private String screenshotPath;
}
