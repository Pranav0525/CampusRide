package com.campusride.controller;

import com.campusride.entity.Location;
import com.campusride.repository.LocationRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
public class LocationController {
    private final LocationRepository locations;

    public LocationController(LocationRepository locations) {
        this.locations = locations;
    }

    @GetMapping
    public List<Location> all() {
        return locations.findAll();
    }
}
