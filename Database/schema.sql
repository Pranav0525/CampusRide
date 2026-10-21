-- CampusRide Database Schema (MySQL 8.0)
-- DBMS Project: CampusRide - Shared Cab Coordination System
-- Team: Pranav Agarwal (25BCE5204), Shayan Rustomji (25BCE5546), Rachit Malik (25BCE5140)

CREATE DATABASE IF NOT EXISTS CampusRide;
USE CampusRide;

-- Disable foreign key checks for clean re-creation
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Ratings;
DROP TABLE IF EXISTS Bookings;
DROP TABLE IF EXISTS CabDetails;
DROP TABLE IF EXISTS RideMembers;
DROP TABLE IF EXISTS Rides;
DROP TABLE IF EXISTS Locations;
DROP TABLE IF EXISTS Users;
DROP VIEW IF EXISTS vw_ride_details;
DROP VIEW IF EXISTS vw_popular_routes;
DROP VIEW IF EXISTS vw_user_stats;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Users Table
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    StudentID VARCHAR(30) UNIQUE,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Phone VARCHAR(15),
    Gender ENUM('Male', 'Female', 'Other') NOT NULL,
    PasswordHash VARCHAR(255),
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Locations Table
CREATE TABLE Locations (
    LocationID INT AUTO_INCREMENT PRIMARY KEY,
    LocationName VARCHAR(100) NOT NULL UNIQUE,
    Address VARCHAR(255)
) ENGINE=InnoDB;

-- 3. Rides Table
CREATE TABLE Rides (
    RideID INT AUTO_INCREMENT PRIMARY KEY,
    CreatorID INT NOT NULL,
    PickupLocationID INT NOT NULL,
    DropLocationID INT NOT NULL,
    StartDateTime DATETIME NOT NULL,
    EstimatedEndDateTime DATETIME,
    CabType VARCHAR(50),
    CabProvider VARCHAR(50),
    TotalSeats INT NOT NULL,
    AvailableSeats INT NOT NULL,
    GenderPreference ENUM('Any', 'Male', 'Female') DEFAULT 'Any',
    EstimatedFare DECIMAL(10,2),
    BookingScreenshot VARCHAR(500),
    Notes VARCHAR(500),
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT FK_Rides_Creator FOREIGN KEY (CreatorID) REFERENCES Users(UserID) ON DELETE CASCADE,
    CONSTRAINT FK_Rides_Pickup FOREIGN KEY (PickupLocationID) REFERENCES Locations(LocationID),
    CONSTRAINT FK_Rides_Drop FOREIGN KEY (DropLocationID) REFERENCES Locations(LocationID),

    CONSTRAINT CK_Rides_TotalSeats CHECK (TotalSeats > 0),
    CONSTRAINT CK_Rides_AvailableSeats CHECK (AvailableSeats >= 0 AND AvailableSeats <= TotalSeats),
    CONSTRAINT CK_Rides_Locations CHECK (PickupLocationID <> DropLocationID)
) ENGINE=InnoDB;

-- 4. RideMembers Table (Confirmed passengers + creator)
CREATE TABLE RideMembers (
    RideMemberID INT AUTO_INCREMENT PRIMARY KEY,
    RideID INT NOT NULL,
    UserID INT NOT NULL,
    JoinedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    MemberStatus ENUM('Creator', 'Joined') DEFAULT 'Joined',
    IndividualFare DECIMAL(10,2),

    CONSTRAINT FK_RideMembers_Ride FOREIGN KEY (RideID) REFERENCES Rides(RideID) ON DELETE CASCADE,
    CONSTRAINT FK_RideMembers_User FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    CONSTRAINT UQ_RideMembers_RideUser UNIQUE (RideID, UserID)
) ENGINE=InnoDB;

-- 5. CabDetails Table
CREATE TABLE CabDetails (
    CabDetailID INT AUTO_INCREMENT PRIMARY KEY,
    RideID INT NOT NULL UNIQUE,
    CabProvider VARCHAR(50),
    CabType VARCHAR(50),
    BookingReference VARCHAR(100),
    BookingStatus VARCHAR(20) DEFAULT 'Not_Booked',
    DriverName VARCHAR(100),
    DriverPhone VARCHAR(15),
    VehicleNumber VARCHAR(30),
    VehicleColor VARCHAR(30),
    ScreenshotPath VARCHAR(500),

    CONSTRAINT FK_CabDetails_Ride FOREIGN KEY (RideID) REFERENCES Rides(RideID) ON DELETE CASCADE,
    CONSTRAINT CK_CabDetails_Status CHECK (BookingStatus IN ('Not_Booked', 'Booked', 'Completed', 'Cancelled'))
) ENGINE=InnoDB;

-- 6. Bookings Table (Join requests and decisions)
CREATE TABLE Bookings (
    BookingID INT AUTO_INCREMENT PRIMARY KEY,
    RideID INT NOT NULL,
    UserID INT NOT NULL,
    Status ENUM('Pending', 'Accepted', 'Rejected', 'Cancelled') NOT NULL DEFAULT 'Pending',
    RequestedAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    RespondedAt DATETIME,
    IndividualFare DECIMAL(10,2),

    CONSTRAINT FK_Bookings_Ride FOREIGN KEY (RideID) REFERENCES Rides(RideID) ON DELETE CASCADE,
    CONSTRAINT FK_Bookings_User FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    CONSTRAINT UQ_Bookings_RideUser UNIQUE (RideID, UserID)
) ENGINE=InnoDB;

-- 7. Ratings Table
CREATE TABLE Ratings (
    RatingID INT AUTO_INCREMENT PRIMARY KEY,
    RideID INT NOT NULL,
    UserID INT NOT NULL,
    RatingValue INT NOT NULL,
    CommentText VARCHAR(500),
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT FK_Ratings_Ride FOREIGN KEY (RideID) REFERENCES Rides(RideID) ON DELETE CASCADE,
    CONSTRAINT FK_Ratings_User FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    CONSTRAINT CK_Ratings_Value CHECK (RatingValue BETWEEN 1 AND 5),
    CONSTRAINT UQ_Ratings_RideUser UNIQUE (RideID, UserID)
) ENGINE=InnoDB;

-- Performance Indexes
CREATE INDEX IDX_Rides_StartDateTime ON Rides(StartDateTime);
CREATE INDEX IDX_Rides_Route ON Rides(PickupLocationID, DropLocationID);
CREATE INDEX IDX_Bookings_Ride ON Bookings(RideID);
CREATE INDEX IDX_Bookings_User ON Bookings(UserID);

-- ============================================================
-- DATABASE VIEWS (for DBMS Evaluation & Reporting)
-- ============================================================

-- View 1: Complete denormalized ride summary with route names, creator, and current status
CREATE VIEW vw_ride_details AS
SELECT 
    r.RideID,
    u.UserID AS CreatorID,
    u.Name AS CreatorName,
    u.Email AS CreatorEmail,
    u.Phone AS CreatorPhone,
    l1.LocationName AS PickupLocation,
    l2.LocationName AS DropLocation,
    r.StartDateTime,
    r.CabProvider,
    r.CabType,
    r.EstimatedFare,
    r.TotalSeats,
    r.AvailableSeats,
    (r.TotalSeats - r.AvailableSeats) AS OccupiedSeats,
    r.GenderPreference,
    CASE 
        WHEN c.BookingStatus = 'Cancelled' THEN 'Cancelled'
        WHEN r.AvailableSeats = 0 THEN 'Full'
        ELSE 'Open'
    END AS RideStatus,
    c.DriverName,
    c.DriverPhone,
    c.VehicleNumber,
    c.VehicleColor,
    c.BookingStatus AS CabBookingStatus,
    r.Notes
FROM Rides r
JOIN Users u ON r.CreatorID = u.UserID
JOIN Locations l1 ON r.PickupLocationID = l1.LocationID
JOIN Locations l2 ON r.DropLocationID = l2.LocationID
LEFT JOIN CabDetails c ON r.RideID = c.RideID;

-- View 2: Popular routes analysis (useful for dashboard aggregations)
CREATE VIEW vw_popular_routes AS
SELECT 
    l1.LocationName AS Pickup,
    l2.LocationName AS DropLocation,
    COUNT(r.RideID) AS TotalRides,
    ROUND(AVG(r.EstimatedFare), 2) AS AverageFare,
    SUM(r.TotalSeats - r.AvailableSeats) AS TotalPassengers
FROM Rides r
JOIN Locations l1 ON r.PickupLocationID = l1.LocationID
JOIN Locations l2 ON r.DropLocationID = l2.LocationID
GROUP BY l1.LocationName, l2.LocationName
ORDER BY TotalRides DESC;

-- View 3: Student ride activity metrics
CREATE VIEW vw_user_stats AS
SELECT 
    u.UserID,
    u.Name,
    u.StudentID,
    u.Email,
    COUNT(DISTINCT r_created.RideID) AS RidesCreated,
    COUNT(DISTINCT rm.RideID) AS RidesJoined,
    COUNT(DISTINCT b.BookingID) AS TotalBookingRequests
FROM Users u
LEFT JOIN Rides r_created ON u.UserID = r_created.CreatorID
LEFT JOIN RideMembers rm ON u.UserID = rm.UserID AND rm.MemberStatus = 'Joined'
LEFT JOIN Bookings b ON u.UserID = b.UserID
GROUP BY u.UserID, u.Name, u.StudentID, u.Email;