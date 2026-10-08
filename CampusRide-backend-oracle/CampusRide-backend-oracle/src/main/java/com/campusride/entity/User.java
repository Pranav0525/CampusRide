package com.campusride.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name="Users") @Getter @Setter @NoArgsConstructor @AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(name="UserID")
    private Integer userId;
    @Column(name="Name", nullable=false, length=100) private String name;
    @Column(name="StudentID", unique=true, length=30) private String studentId;
    @Column(name="Email", nullable=false, unique=true, length=100) private String email;
    @Column(name="Phone", length=15) private String phone;
    @Enumerated(EnumType.STRING) @Column(name="Gender", nullable=false, length=10) private Gender gender;
    @JsonIgnore @Column(name="PasswordHash", length=255) private String passwordHash;
    public enum Gender { Male, Female, Other }
}
