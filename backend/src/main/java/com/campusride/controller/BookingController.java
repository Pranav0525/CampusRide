package com.campusride.controller;
import com.campusride.dto.BookingDecisionRequest;import com.campusride.service.BookingService;import jakarta.validation.Valid;import org.springframework.web.bind.annotation.*;import java.util.Map;
@RestController @RequestMapping("/api/bookings") public class BookingController {private final BookingService service;public BookingController(BookingService service){this.service=service;}
 @PutMapping("/{id}/accept") public Object accept(@PathVariable Integer id,@Valid @RequestBody BookingDecisionRequest r){var b=service.decide(id,r.creatorId(),true);return Map.of("bookingId",b.getBookingId(),"status",b.getStatus());}
 @PutMapping("/{id}/reject") public Object reject(@PathVariable Integer id,@Valid @RequestBody BookingDecisionRequest r){var b=service.decide(id,r.creatorId(),false);return Map.of("bookingId",b.getBookingId(),"status",b.getStatus());}}
