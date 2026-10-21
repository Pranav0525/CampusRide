package com.campusride.repository;
import com.campusride.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface LocationRepository extends JpaRepository<Location,Integer> { Optional<Location> findByLocationNameIgnoreCase(String name); }
