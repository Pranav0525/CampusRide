package com.campusride.repository;
import com.campusride.entity.RideMember;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface RideMemberRepository extends JpaRepository<RideMember,Integer> {
    boolean existsByRideRideIdAndUserUserId(Integer rideId,Integer userId);
    List<RideMember> findByRideRideId(Integer rideId);
    List<RideMember> findByUserUserId(Integer userId);
}
