DROP DATABASE IF EXISTS CampusRide;
CREATE DATABASE CampusRide CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE CampusRide;

USE CampusRide;

CREATE TABLE Student (
 StudentID INT PRIMARY KEY AUTO_INCREMENT,
 StudentName VARCHAR(100) NOT NULL,
 Email VARCHAR(120) NOT NULL UNIQUE,
 Phone VARCHAR(15),
 Gender ENUM('Male','Female','Other','Prefer not to say') NOT NULL,
 CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Location (
 LocationID INT PRIMARY KEY AUTO_INCREMENT,
 LocationName VARCHAR(100) NOT NULL UNIQUE,
 Address VARCHAR(255)
);

CREATE TABLE Cab_Details (
 CabID INT PRIMARY KEY AUTO_INCREMENT,
 CabApp ENUM('Uber','Ola','Rapido','Other') NOT NULL,
 VehicleType VARCHAR(30),
 VehicleNumber VARCHAR(20),
 DriverName VARCHAR(100),
 DriverPhone VARCHAR(15)
);

CREATE TABLE Ride (
 RideID INT PRIMARY KEY AUTO_INCREMENT,
 CreatorID INT NOT NULL,
 PickupLocationID INT NOT NULL,
 DropLocationID INT NOT NULL,
 CabID INT,
 RideDate DATE NOT NULL,
 RideTime TIME NOT NULL,
 TotalFare DECIMAL(10,2) NOT NULL,
 TotalSeats INT NOT NULL,
 AvailableSeats INT NOT NULL,
 GenderPreference ENUM('Any','Male','Female') DEFAULT 'Any',
 AdditionalDetails VARCHAR(500),
 RideStatus ENUM('OPEN','FULL','COMPLETED','CANCELLED') DEFAULT 'OPEN',
 CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY (CreatorID) REFERENCES Student(StudentID),
 FOREIGN KEY (PickupLocationID) REFERENCES Location(LocationID),
 FOREIGN KEY (DropLocationID) REFERENCES Location(LocationID),
 FOREIGN KEY (CabID) REFERENCES Cab_Details(CabID),
 CHECK (TotalFare >= 0),
 CHECK (TotalSeats > 0),
 CHECK (AvailableSeats BETWEEN 0 AND TotalSeats),
 CHECK (PickupLocationID <> DropLocationID)
);

CREATE TABLE Booking (
 BookingID INT PRIMARY KEY AUTO_INCREMENT,
 RideID INT NOT NULL,
 StudentID INT NOT NULL,
 BookingStatus ENUM('PENDING','ACCEPTED','REJECTED','CANCELLED','COMPLETED') DEFAULT 'PENDING',
 IndividualFare DECIMAL(10,2) NOT NULL,
 BookingDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY (RideID) REFERENCES Ride(RideID),
 FOREIGN KEY (StudentID) REFERENCES Student(StudentID),
 UNIQUE (RideID, StudentID),
 CHECK (IndividualFare >= 0)
);

CREATE TABLE Rating (
 RatingID INT PRIMARY KEY AUTO_INCREMENT,
 BookingID INT NOT NULL UNIQUE,
 RatingValue INT NOT NULL,
 Comment VARCHAR(500),
 RatingDate DATE DEFAULT (CURRENT_DATE),
 FOREIGN KEY (BookingID) REFERENCES Booking(BookingID),
 CHECK (RatingValue BETWEEN 1 AND 5)
);

USE CampusRide;
CREATE INDEX idx_ride_route_date ON Ride(PickupLocationID, DropLocationID, RideDate);
CREATE INDEX idx_ride_status_date ON Ride(RideStatus, RideDate);
CREATE INDEX idx_booking_student_status ON Booking(StudentID, BookingStatus);
CREATE INDEX idx_booking_ride_status ON Booking(RideID, BookingStatus);

USE CampusRide;

INSERT INTO Student (StudentName,Email,Phone,Gender) VALUES
('Pranav Agarwal','pranav@example.com','9876543210','Male'),
('Rahul Sharma','rahul@example.com','9876543211','Male'),
('Ananya Singh','ananya@example.com','9876543212','Female'),
('Riya Patel','riya@example.com','9876543213','Female'),
('Arjun Kumar','arjun@example.com','9876543214','Male'),
('Sneha Iyer','sneha@example.com','9876543215','Female'),
('Karthik Rao','karthik@example.com','9876543216','Male');

INSERT INTO Location (LocationName,Address) VALUES
('VIT Chennai','Vandalur-Kelambakkam Road'),
('Chennai Airport','Meenambakkam'),
('Chennai Central','Park Town'),
('Tambaram Railway Station','Tambaram'),
('CMBT','Koyambedu');

INSERT INTO Cab_Details (CabApp,VehicleType,VehicleNumber,DriverName,DriverPhone) VALUES
('Uber','Sedan','TN38AB1234','Ramesh Kumar','9876500001'),
('Ola','Sedan','TN01CD5678','Suresh Kumar','9876500002'),
('Rapido','Auto','TN22EF9012','Kumar','9876500003'),
('Uber','SUV',NULL,NULL,NULL);

INSERT INTO Ride
(CreatorID,PickupLocationID,DropLocationID,CabID,RideDate,RideTime,TotalFare,TotalSeats,AvailableSeats,GenderPreference,AdditionalDetails,RideStatus)
VALUES
(1,1,2,1,'2026-10-15','18:00:00',800,4,1,'Any','Airport trip; luggage preferred.','OPEN'),
(3,1,3,2,'2026-10-16','08:00:00',600,4,3,'Female','Morning trip to Central.','OPEN'),
(5,1,4,3,'2026-10-17','17:30:00',350,3,2,'Any','Shared auto to Tambaram.','OPEN'),
(2,1,5,4,'2026-10-18','09:30:00',500,4,4,'Any','Driver details will be added later.','OPEN');

INSERT INTO Booking (RideID,StudentID,BookingStatus,IndividualFare) VALUES
(1,2,'ACCEPTED',200),
(1,3,'ACCEPTED',200),
(1,4,'ACCEPTED',200),
(2,4,'ACCEPTED',200),
(3,1,'ACCEPTED',175),
(3,7,'PENDING',175);

INSERT INTO Rating (BookingID,RatingValue,Comment) VALUES
(1,5,'Smooth coordination.'),
(2,4,'Good ride.');

USE CampusRide;

CREATE OR REPLACE VIEW AvailableRides AS
SELECT R.RideID,S.StudentName AS Creator,
       LP.LocationName AS Pickup,LD.LocationName AS Destination,
       R.RideDate,R.RideTime,C.CabApp,C.VehicleType,
       R.TotalFare,R.AvailableSeats,R.GenderPreference
FROM Ride R
JOIN Student S ON R.CreatorID=S.StudentID
JOIN Location LP ON R.PickupLocationID=LP.LocationID
JOIN Location LD ON R.DropLocationID=LD.LocationID
LEFT JOIN Cab_Details C ON R.CabID=C.CabID
WHERE R.RideStatus='OPEN' AND R.AvailableSeats>0;

USE CampusRide;
DROP PROCEDURE IF EXISTS JoinRide;
DELIMITER //
CREATE PROCEDURE JoinRide(
 IN p_ride_id INT, IN p_student_id INT, IN p_individual_fare DECIMAL(10,2)
)
BEGIN
 DECLARE v_available INT;
 DECLARE v_status VARCHAR(20);
 DECLARE v_existing INT DEFAULT 0;

 START TRANSACTION;

 SELECT AvailableSeats,RideStatus INTO v_available,v_status
 FROM Ride WHERE RideID=p_ride_id FOR UPDATE;

 SELECT COUNT(*) INTO v_existing
 FROM Booking
 WHERE RideID=p_ride_id AND StudentID=p_student_id
 AND BookingStatus IN ('PENDING','ACCEPTED');

 IF v_existing>0 THEN
   ROLLBACK;
   SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='Student already has an active booking/request';
 ELSEIF v_status<>'OPEN' OR v_available<=0 THEN
   ROLLBACK;
   SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='Ride is not available';
 ELSE
   INSERT INTO Booking(RideID,StudentID,BookingStatus,IndividualFare)
   VALUES(p_ride_id,p_student_id,'ACCEPTED',p_individual_fare);
   UPDATE Ride
   SET AvailableSeats=AvailableSeats-1,
       RideStatus=CASE WHEN AvailableSeats-1=0 THEN 'FULL' ELSE 'OPEN' END
   WHERE RideID=p_ride_id;
   COMMIT;
 END IF;
END //
DELIMITER ;