package com.campusride.dto;
import com.campusride.entity.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
public record RideResponse(Integer id,Integer creatorId,String creator,String creatorEmail,String creatorPhone,String pickup,String drop,LocalDateTime startDateTime,String cabApp,String vehicleType,BigDecimal fare,Integer availableSeats,Integer totalSeats,String genderPreference,String status,String notes,Boolean preBooked,String driverName,String driverPhone,String vehicleNumber,String vehicleColor) {
    public static RideResponse from(Ride r) {
        return from(r, null);
    }
    public static RideResponse from(Ride r, CabDetails cab) {
        String status=r.getAvailableSeats()>0?"Open":"Full";
        if (cab != null && "Cancelled".equalsIgnoreCase(cab.getBookingStatus())) {
            status = "Cancelled";
        }
        String gp=r.getGenderPreference()==null?"Any":(r.getGenderPreference()==Ride.GenderPreference.Male?"Male Only":r.getGenderPreference()==Ride.GenderPreference.Female?"Female Only":"Any");
        boolean preBooked = cab != null && "Booked".equalsIgnoreCase(cab.getBookingStatus());
        return new RideResponse(
            r.getRideId(),
            r.getCreator().getUserId(),
            r.getCreator().getName(),
            r.getCreator().getEmail(),
            r.getCreator().getPhone(),
            r.getPickupLocation().getLocationName(),
            r.getDropLocation().getLocationName(),
            r.getStartDateTime(),
            r.getCabProvider(),
            r.getCabType(),
            r.getEstimatedFare(),
            r.getAvailableSeats(),
            r.getTotalSeats(),
            gp,
            status,
            r.getNotes(),
            preBooked,
            cab != null ? cab.getDriverName() : null,
            cab != null ? cab.getDriverPhone() : null,
            cab != null ? cab.getVehicleNumber() : null,
            cab != null ? cab.getVehicleColor() : null
        );
    }
}
