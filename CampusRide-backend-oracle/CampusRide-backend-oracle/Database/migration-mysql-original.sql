USE CampusRide;

-- Run only if you already created the original CampusRide schema.
ALTER TABLE Users ADD COLUMN StudentID VARCHAR(30) UNIQUE;
ALTER TABLE Users ADD COLUMN PasswordHash VARCHAR(255);
ALTER TABLE RideMembers ADD COLUMN IndividualFare DECIMAL(10,2);
ALTER TABLE CabDetails ADD COLUMN DriverName VARCHAR(100);
ALTER TABLE CabDetails ADD COLUMN DriverPhone VARCHAR(15);
ALTER TABLE CabDetails ADD COLUMN VehicleNumber VARCHAR(30);
ALTER TABLE CabDetails ADD COLUMN VehicleColor VARCHAR(30);

CREATE TABLE IF NOT EXISTS Bookings (
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
