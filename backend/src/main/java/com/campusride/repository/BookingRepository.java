package com.campusride.repository;
import com.campusride.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
public interface BookingRepository extends JpaRepository<Booking,Integer> {
    Optional<Booking> findByRideRideIdAndUserUserId(Integer rideId,Integer userId);
    List<Booking> findByUserUserIdOrderByRequestedAtDesc(Integer userId);
    List<Booking> findByRideRideIdOrderByRequestedAtAsc(Integer rideId);
}
