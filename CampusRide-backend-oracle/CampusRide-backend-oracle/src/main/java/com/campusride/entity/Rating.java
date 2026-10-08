package com.campusride.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name="Ratings", uniqueConstraints=@UniqueConstraint(columnNames={"RideID","UserID"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Rating {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(name="RatingID") private Integer ratingId;
    @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="RideID", nullable=false) private Ride ride;
    @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="UserID", nullable=false) private User user;
    @Column(name="RatingValue", nullable=false) private Integer ratingValue;
    @Column(name="CommentText", length=500) private String comment;
}
