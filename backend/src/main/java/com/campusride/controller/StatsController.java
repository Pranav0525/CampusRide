package com.campusride.controller;

import com.campusride.repository.BookingRepository;
import com.campusride.repository.RideRepository;
import com.campusride.repository.UserRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
public class StatsController {

    private final UserRepository users;
    private final RideRepository rides;
    private final BookingRepository bookings;
    private final JdbcTemplate jdbcTemplate;

    public StatsController(UserRepository users, RideRepository rides, BookingRepository bookings, JdbcTemplate jdbcTemplate) {
        this.users = users;
        this.rides = rides;
        this.bookings = bookings;
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/overview")
    public Map<String, Object> overview() {
        Map<String, Object> stats = new HashMap<>();

        long totalUsers = users.count();
        long totalRides = rides.count();
        long totalBookings = bookings.count();

        // Calculate average fare and active rides using SQL aggregation
        Double avgFare = null;
        Long activeRides = null;
        try {
            avgFare = jdbcTemplate.queryForObject("SELECT ROUND(AVG(EstimatedFare), 2) FROM Rides", Double.class);
            activeRides = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM Rides WHERE AvailableSeats > 0", Long.class);
        } catch (Exception ignored) {
        }

        // Query popular routes view created in schema.sql
        List<Map<String, Object>> popularRoutes = List.of();
        try {
            popularRoutes = jdbcTemplate.queryForList("SELECT Pickup, DropLocation, TotalRides, AverageFare, TotalPassengers FROM vw_popular_routes LIMIT 5");
        } catch (Exception ignored) {
        }

        stats.put("totalUsers", totalUsers);
        stats.put("totalRides", totalRides);
        stats.put("activeRides", activeRides != null ? activeRides : 0);
        stats.put("totalBookings", totalBookings);
        stats.put("averageFare", avgFare != null ? avgFare : 0.0);
        stats.put("popularRoutes", popularRoutes);

        return stats;
    }
}
