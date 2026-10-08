package com.campusride.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity @Table(name="RideMembers", uniqueConstraints=@UniqueConstraint(columnNames={"RideID","UserID"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class RideMember {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(name="RideMemberID") private Integer rideMemberId;
    @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="RideID", nullable=false) private Ride ride;
    @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="UserID", nullable=false) private User user;
    @Column(name="JoinedAt") private LocalDateTime joinedAt;
    @Enumerated(EnumType.STRING) @Column(name="MemberStatus", length=10) private MemberStatus memberStatus;
    @Column(name="IndividualFare", precision=10, scale=2) private BigDecimal individualFare;
    public enum MemberStatus { Creator, Joined }
}
