package com.campusride.repository;
import com.campusride.entity.Ride;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;
public interface RideRepository extends JpaRepository<Ride,Integer> {
    @Query("select r from Ride r join fetch r.creator c join fetch r.pickupLocation p join fetch r.dropLocation d where r.availableSeats > 0 and (:pickup is null or lower(p.locationName)=lower(:pickup)) and (:drop is null or lower(d.locationName)=lower(:drop)) and (:from is null or r.startDateTime >= :from) and (:to is null or r.startDateTime <= :to) order by r.startDateTime")
    List<Ride> search(@Param("pickup") String pickup, @Param("drop") String drop, @Param("from") LocalDateTime from, @Param("to") LocalDateTime to);
}
