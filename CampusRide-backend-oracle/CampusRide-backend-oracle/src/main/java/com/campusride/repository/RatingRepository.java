package com.campusride.repository;
import com.campusride.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
public interface RatingRepository extends JpaRepository<Rating,Integer> { }
