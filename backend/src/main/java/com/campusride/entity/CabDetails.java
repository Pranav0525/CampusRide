package com.campusride.entity;

import jakarta.persistence.*;

@Entity
@Table(name="CabDetails")
public class CabDetails {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="CabDetailID")
    private Integer cabDetailId;

    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="RideID", nullable=false, unique=true)
    private Ride ride;

    @Column(name="CabProvider", length=50)
    private String cabProvider;

    @Column(name="CabType", length=50)
    private String cabType;

    @Column(name="BookingReference", length=100)
    private String bookingReference;

    @Column(name="BookingStatus", length=20)
    private String bookingStatus;

    @Column(name="DriverName", length=100)
    private String driverName;

    @Column(name="DriverPhone", length=15)
    private String driverPhone;

    @Column(name="VehicleNumber", length=30)
    private String vehicleNumber;

    @Column(name="VehicleColor", length=30)
    private String vehicleColor;

    @Column(name="ScreenshotPath", length=500)
    private String screenshotPath;

    public CabDetails() {}

    public Integer getCabDetailId() { return cabDetailId; }
    public void setCabDetailId(Integer cabDetailId) { this.cabDetailId = cabDetailId; }

    public Ride getRide() { return ride; }
    public void setRide(Ride ride) { this.ride = ride; }

    public String getCabProvider() { return cabProvider; }
    public void setCabProvider(String cabProvider) { this.cabProvider = cabProvider; }

    public String getCabType() { return cabType; }
    public void setCabType(String cabType) { this.cabType = cabType; }

    public String getBookingReference() { return bookingReference; }
    public void setBookingReference(String bookingReference) { this.bookingReference = bookingReference; }

    public String getBookingStatus() { return bookingStatus; }
    public void setBookingStatus(String bookingStatus) { this.bookingStatus = bookingStatus; }

    public String getDriverName() { return driverName; }
    public void setDriverName(String driverName) { this.driverName = driverName; }

    public String getDriverPhone() { return driverPhone; }
    public void setDriverPhone(String driverPhone) { this.driverPhone = driverPhone; }

    public String getVehicleNumber() { return vehicleNumber; }
    public void setVehicleNumber(String vehicleNumber) { this.vehicleNumber = vehicleNumber; }

    public String getVehicleColor() { return vehicleColor; }
    public void setVehicleColor(String vehicleColor) { this.vehicleColor = vehicleColor; }

    public String getScreenshotPath() { return screenshotPath; }
    public void setScreenshotPath(String screenshotPath) { this.screenshotPath = screenshotPath; }
}
