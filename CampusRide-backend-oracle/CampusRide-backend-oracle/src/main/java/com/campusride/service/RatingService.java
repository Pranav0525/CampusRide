package com.campusride.service;
import com.campusride.dto.RatingRequest;import com.campusride.entity.*;import com.campusride.exception.*;import com.campusride.repository.*;import org.springframework.stereotype.Service;
@Service public class RatingService { private final RatingRepository ratings;private final RideRepository rides;private final UserRepository users;private final RideMemberRepository members;
 public RatingService(RatingRepository ratings,RideRepository rides,UserRepository users,RideMemberRepository members){this.ratings=ratings;this.rides=rides;this.users=users;this.members=members;}
 public Rating add(Integer rideId,RatingRequest r){Ride ride=rides.findById(rideId).orElseThrow(()->new NotFoundException("Ride not found"));User user=users.findById(r.userId()).orElseThrow(()->new NotFoundException("User not found"));if(!members.existsByRideRideIdAndUserUserId(rideId,user.getUserId()))throw new BadRequestException("Only ride members can rate a ride");Rating x=new Rating();x.setRide(ride);x.setUser(user);x.setRatingValue(r.ratingValue());x.setComment(r.comment());return ratings.save(x);}
}
