package com.campusride.controller;
import com.campusride.entity.User;import com.campusride.exception.NotFoundException;import com.campusride.repository.UserRepository;import com.campusride.service.BookingService;import com.campusride.service.RideService;import org.springframework.web.bind.annotation.*;import java.util.List;import java.util.Map;
@RestController @RequestMapping("/api/users") public class UserController {private final UserRepository users;private final BookingService bookings;private final RideService rides;public UserController(UserRepository users,BookingService bookings,RideService rides){this.users=users;this.bookings=bookings;this.rides=rides;}
 @GetMapping public List<User> all(){return users.findAll();}
 @GetMapping("/{id}") public Object get(@PathVariable Integer id){User u=users.findById(id).orElseThrow(()->new NotFoundException("User not found"));return Map.of("userId",u.getUserId(),"name",u.getName(),"studentId",u.getStudentId()!=null?u.getStudentId():"","email",u.getEmail(),"phone",u.getPhone()!=null?u.getPhone():"","gender",u.getGender());}
 @GetMapping("/{id}/bookings") public Object bookings(@PathVariable Integer id){return bookings.byUser(id);}
 @GetMapping("/{id}/rides") public Object userRides(@PathVariable Integer id){return rides.byUser(id);}}
