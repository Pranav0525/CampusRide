package com.campusride.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name="Locations") @Getter @Setter @NoArgsConstructor @AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Location {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(name="LocationID") private Integer locationId;
    @Column(name="LocationName", nullable=false, length=100) private String locationName;
    @Column(name="Address", length=255) private String address;
}
