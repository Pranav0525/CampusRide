package com.campusride.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name="Ratings", uniqueConstraints=@UniqueConstraint(columnNames={"RideID","UserID"}))
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Rating {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="RatingID")
    private Integer ratingId;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="RideID", nullable=false)
    private Ride ride;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="UserID", nullable=false)
    private User user;

    @Column(name="RatingValue", nullable=false)
    private Integer ratingValue;

    @Column(name="CommentText", length=500)
    private String comment;

    public Rating() {}

    public Integer getRatingId() { return ratingId; }
    public void setRatingId(Integer ratingId) { this.ratingId = ratingId; }

    public Ride getRide() { return ride; }
    public void setRide(Ride ride) { this.ride = ride; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Integer getRatingValue() { return ratingValue; }
    public void setRatingValue(Integer ratingValue) { this.ratingValue = ratingValue; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
}
