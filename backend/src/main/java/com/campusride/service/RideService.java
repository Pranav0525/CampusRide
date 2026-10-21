package com.campusride.service;
import com.campusride.dto.*;
import com.campusride.entity.*;
import com.campusride.exception.*;
import com.campusride.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
@Service
public class RideService {
 private final RideRepository rides; private final UserRepository users; private final LocationRepository locations; private final RideMemberRepository members; private final CabDetailsRepository cabs;
 public RideService(RideRepository rides,UserRepository users,LocationRepository locations,RideMemberRepository members,CabDetailsRepository cabs){this.rides=rides;this.users=users;this.locations=locations;this.members=members;this.cabs=cabs;}
 @Transactional public RideResponse create(CreateRideRequest r){
   if(r.pickupLocationId().equals(r.dropLocationId())) throw new BadRequestException("Pickup and drop locations cannot be the same");
   User creator=users.findById(r.creatorId()).orElseThrow(()->new NotFoundException("Creator not found"));
   Location pickup=locations.findById(r.pickupLocationId()).orElseThrow(()->new NotFoundException("Pickup location not found"));
   Location drop=locations.findById(r.dropLocationId()).orElseThrow(()->new NotFoundException("Drop location not found"));
   Ride ride=new Ride(); ride.setCreator(creator);ride.setPickupLocation(pickup);ride.setDropLocation(drop);ride.setStartDateTime(r.startDateTime());ride.setEstimatedEndDateTime(r.estimatedEndDateTime());ride.setCabType(r.cabType());ride.setCabProvider(r.cabProvider());ride.setTotalSeats(r.totalSeats());ride.setAvailableSeats(r.totalSeats());ride.setGenderPreference(Ride.GenderPreference.valueOf(normalizeGender(r.genderPreference())));ride.setEstimatedFare(r.estimatedFare());ride.setBookingScreenshot(r.bookingScreenshot());ride.setNotes(r.notes());
   ride=rides.save(ride);
   RideMember creatorMember=new RideMember(); creatorMember.setRide(ride);creatorMember.setUser(creator);creatorMember.setJoinedAt(LocalDateTime.now());creatorMember.setMemberStatus(RideMember.MemberStatus.Creator);members.save(creatorMember);
   CabDetails cab=new CabDetails();
   cab.setRide(ride);
   cab.setCabProvider(r.cabProvider());
   cab.setCabType(r.cabType());
   cab.setBookingStatus(Boolean.TRUE.equals(r.preBooked()) ? "Booked" : "Not_Booked");
   cab.setDriverName(blankToNull(r.driverName()));
   cab.setDriverPhone(blankToNull(r.driverPhone()));
   cab.setVehicleNumber(blankToNull(r.vehicleNumber()));
   cab.setVehicleColor(blankToNull(r.vehicleColor()));
   cab.setScreenshotPath(blankToNull(r.bookingScreenshot()));
   cab = cabs.save(cab);
   return RideResponse.from(ride, cab);
 }
 public List<RideResponse> search(String pickup,String drop,LocalDateTime from,LocalDateTime to){return rides.search(blankToNull(pickup),blankToNull(drop),from,to).stream().map(this::toResponse).toList();}
 public Ride get(Integer id){return rides.findById(id).orElseThrow(()->new NotFoundException("Ride not found"));}
 public RideResponse getResponse(Integer id){return toResponse(get(id));}
 public RideResponse toResponse(Ride r){return RideResponse.from(r, cabs.findByRideRideId(r.getRideId()).orElse(null));}
 @Transactional public RideResponse cancel(Integer id, Integer creatorId){
   Ride ride = get(id);
   if (creatorId != null && !ride.getCreator().getUserId().equals(creatorId)) {
     throw new BadRequestException("Only the ride creator can cancel this ride");
   }
   ride.setAvailableSeats(0);
   rides.save(ride);
   CabDetails cab = cabs.findByRideRideId(id).orElseGet(() -> {
     CabDetails c = new CabDetails();
     c.setRide(ride);
     c.setCabProvider(ride.getCabProvider());
     c.setCabType(ride.getCabType());
     return c;
   });
   cab.setBookingStatus("Cancelled");
   cabs.save(cab);
   return RideResponse.from(ride, cab);
 }
 public List<RideMember> members(Integer id){get(id);return members.findByRideRideId(id);}
 public List<RideResponse> byUser(Integer userId){return members.findByUserUserId(userId).stream().map(m -> toResponse(m.getRide())).toList();}
 private String blankToNull(String s){return s==null||s.isBlank()?null:s;}
 private String normalizeGender(String s){if(s==null||s.equalsIgnoreCase("Any"))return "Any";if(s.equalsIgnoreCase("Male Only")||s.equalsIgnoreCase("Male"))return "Male";if(s.equalsIgnoreCase("Female Only")||s.equalsIgnoreCase("Female"))return "Female";throw new BadRequestException("Invalid gender preference");}
}
