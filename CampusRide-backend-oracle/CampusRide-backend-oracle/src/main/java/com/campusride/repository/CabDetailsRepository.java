package com.campusride.repository;
import com.campusride.entity.CabDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface CabDetailsRepository extends JpaRepository<CabDetails,Integer> { Optional<CabDetails> findByRideRideId(Integer rideId); }
