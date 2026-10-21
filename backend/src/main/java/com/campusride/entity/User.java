package com.campusride.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name="Users")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="UserID")
    private Integer userId;

    @Column(name="Name", nullable=false, length=100)
    private String name;

    @Column(name="StudentID", unique=true, length=30)
    private String studentId;

    @Column(name="Email", nullable=false, unique=true, length=100)
    private String email;

    @Column(name="Phone", length=15)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(name="Gender", nullable=false, length=10)
    private Gender gender;

    @JsonIgnore
    @Column(name="PasswordHash", length=255)
    private String passwordHash;

    public enum Gender { Male, Female, Other }

    public User() {}

    public User(Integer userId, String name, String studentId, String email, String phone, Gender gender, String passwordHash) {
        this.userId = userId;
        this.name = name;
        this.studentId = studentId;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.passwordHash = passwordHash;
    }

    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public Gender getGender() { return gender; }
    public void setGender(Gender gender) { this.gender = gender; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
}
