package com.campusride.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name="RideMembers", uniqueConstraints=@UniqueConstraint(columnNames={"RideID","UserID"}))
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class RideMember {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="RideMemberID")
    private Integer rideMemberId;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="RideID", nullable=false)
    private Ride ride;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="UserID", nullable=false)
    private User user;

    @Column(name="JoinedAt")
    private LocalDateTime joinedAt;

    @Enumerated(EnumType.STRING)
    @Column(name="MemberStatus", length=10)
    private MemberStatus memberStatus;

    @Column(name="IndividualFare", precision=10, scale=2)
    private BigDecimal individualFare;

    public enum MemberStatus { Creator, Joined }

    public RideMember() {}

    public Integer getRideMemberId() { return rideMemberId; }
    public void setRideMemberId(Integer rideMemberId) { this.rideMemberId = rideMemberId; }

    public Ride getRide() { return ride; }
    public void setRide(Ride ride) { this.ride = ride; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public LocalDateTime getJoinedAt() { return joinedAt; }
    public void setJoinedAt(LocalDateTime joinedAt) { this.joinedAt = joinedAt; }

    public MemberStatus getMemberStatus() { return memberStatus; }
    public void setMemberStatus(MemberStatus memberStatus) { this.memberStatus = memberStatus; }

    public BigDecimal getIndividualFare() { return individualFare; }
    public void setIndividualFare(BigDecimal individualFare) { this.individualFare = individualFare; }
}
