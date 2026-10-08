CREATE DATABASE IF NOT EXISTS CampusRide;
USE CampusRide;

CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    StudentID VARCHAR(30) UNIQUE,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Phone VARCHAR(15),
    Gender ENUM('Male', 'Female', 'Other') NOT NULL,
    PasswordHash VARCHAR(255)
);

CREATE TABLE Locations (
    LocationID INT AUTO_INCREMENT PRIMARY KEY,
    LocationName VARCHAR(100) NOT NULL UNIQUE,
    Address VARCHAR(255)
);

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
    FOREIGN KEY (CreatorID) REFERENCES Users(UserID),
    FOREIGN KEY (PickupLocationID) REFERENCES Locations(LocationID),
    FOREIGN KEY (DropLocationID) REFERENCES Locations(LocationID),
    CHECK (TotalSeats > 0), CHECK (AvailableSeats >= 0), CHECK (AvailableSeats <= TotalSeats), CHECK (PickupLocationID <> DropLocationID)
);

CREATE TABLE RideMembers (
    RideMemberID INT AUTO_INCREMENT PRIMARY KEY,
    RideID INT NOT NULL,
    UserID INT NOT NULL,
    JoinedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    MemberStatus ENUM('Creator', 'Joined') DEFAULT 'Joined',
    IndividualFare DECIMAL(10,2),
    FOREIGN KEY (RideID) REFERENCES Rides(RideID) ON DELETE CASCADE,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    UNIQUE (RideID, UserID)
);

CREATE TABLE CabDetails (
    CabDetailID INT AUTO_INCREMENT PRIMARY KEY,
    RideID INT NOT NULL,
    CabProvider VARCHAR(50), CabType VARCHAR(50), BookingReference VARCHAR(100),
    BookingStatus ENUM('Not_Booked','Booked','Completed','Cancelled') DEFAULT 'Not_Booked',
    DriverName VARCHAR(100), DriverPhone VARCHAR(15), VehicleNumber VARCHAR(30), VehicleColor VARCHAR(30),
    ScreenshotPath VARCHAR(500),
    FOREIGN KEY (RideID) REFERENCES Rides(RideID) ON DELETE CASCADE, UNIQUE (RideID)
);

CREATE TABLE Bookings (
    BookingID INT AUTO_INCREMENT PRIMARY KEY,
    RideID INT NOT NULL,
    UserID INT NOT NULL,
    Status ENUM('Pending','Accepted','Rejected','Cancelled') NOT NULL DEFAULT 'Pending',
    RequestedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    RespondedAt DATETIME,
    IndividualFare DECIMAL(10,2),
    FOREIGN KEY (RideID) REFERENCES Rides(RideID) ON DELETE CASCADE,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    UNIQUE (RideID, UserID)
);

CREATE TABLE Ratings (
    RatingID INT AUTO_INCREMENT PRIMARY KEY,
    RideID INT NOT NULL, UserID INT NOT NULL, RatingValue INT NOT NULL, Comment VARCHAR(500),
    FOREIGN KEY (RideID) REFERENCES Rides(RideID) ON DELETE CASCADE,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    CHECK (RatingValue BETWEEN 1 AND 5), UNIQUE (RideID, UserID)
);
