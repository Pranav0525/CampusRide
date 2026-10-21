package com.campusride.service;
import com.campusride.dto.JoinRideRequest;
import com.campusride.entity.*;
import com.campusride.exception.*;
import com.campusride.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
@Service
public class BookingService {
 private final BookingRepository bookings; private final RideRepository rides; private final UserRepository users; private final RideMemberRepository members;
 public BookingService(BookingRepository bookings,RideRepository rides,UserRepository users,RideMemberRepository members){this.bookings=bookings;this.rides=rides;this.users=users;this.members=members;}
 @Transactional public Booking request(Integer rideId, JoinRideRequest req){
   Ride ride=rides.findById(rideId).orElseThrow(()->new NotFoundException("Ride not found")); User user=users.findById(req.userId()).orElseThrow(()->new NotFoundException("User not found"));
   if(ride.getCreator().getUserId().equals(user.getUserId())) throw new BadRequestException("Ride creator is already a member");
   if(ride.getAvailableSeats()<=0) throw new BadRequestException("No seats available");
   if(members.existsByRideRideIdAndUserUserId(rideId,user.getUserId())) throw new BadRequestException("User is already a confirmed member");
   if(bookings.findByRideRideIdAndUserUserId(rideId,user.getUserId()).isPresent()) throw new BadRequestException("Booking request already exists");
   Booking b=new Booking();b.setRide(ride);b.setUser(user);b.setStatus(Booking.BookingStatus.Pending);b.setRequestedAt(LocalDateTime.now());return bookings.save(b);
 }
 @Transactional public Booking decide(Integer bookingId,Integer creatorId,boolean accept){
   Booking b=bookings.findById(bookingId).orElseThrow(()->new NotFoundException("Booking not found"));
   if(!b.getRide().getCreator().getUserId().equals(creatorId)) throw new BadRequestException("Only the ride creator can decide this request");
   if(b.getStatus()!=Booking.BookingStatus.Pending) throw new BadRequestException("Booking is already decided");
   if(accept){
     Ride ride=rides.findById(b.getRide().getRideId()).orElseThrow(()->new NotFoundException("Ride not found"));
     if(ride.getAvailableSeats()<=0) throw new BadRequestException("No seats available");
     ride.setAvailableSeats(ride.getAvailableSeats()-1);rides.save(ride);
     RideMember m=new RideMember();m.setRide(ride);m.setUser(b.getUser());m.setJoinedAt(LocalDateTime.now());m.setMemberStatus(RideMember.MemberStatus.Joined);members.save(m);
     b.setStatus(Booking.BookingStatus.Accepted);
   } else b.setStatus(Booking.BookingStatus.Rejected);
   b.setRespondedAt(LocalDateTime.now()); return bookings.save(b);
 }
 public List<Booking> byUser(Integer userId){return bookings.findByUserUserIdOrderByRequestedAtDesc(userId);}
 public List<Booking> byRide(Integer rideId){return bookings.findByRideRideIdOrderByRequestedAtAsc(rideId);}
}
