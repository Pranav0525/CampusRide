USE CampusRide;

-- Non-destructive verification
SHOW TABLES;
SHOW FULL TABLES WHERE Table_type = 'VIEW';
SHOW PROCEDURE STATUS WHERE Db = 'CampusRide' AND Name = 'JoinRide';
SELECT * FROM AvailableRides;

-- These are intentional negative tests; uncomment one at a time.

-- Duplicate email:
-- INSERT INTO Student(StudentName,Email,Gender)
-- VALUES('Duplicate','pranav@example.com','Male');

-- Duplicate booking:
-- INSERT INTO Booking(RideID,StudentID,BookingStatus,IndividualFare)
-- VALUES(1,2,'PENDING',200);

-- Invalid rating:
-- INSERT INTO Rating(BookingID,RatingValue,Comment)
-- VALUES(1,6,'Invalid');

-- Invalid foreign key:
-- INSERT INTO Ride(CreatorID,PickupLocationID,DropLocationID,RideDate,RideTime,TotalFare,TotalSeats,AvailableSeats)
-- VALUES(999,1,2,'2026-10-20','10:00:00',500,4,4);

-- Query-plan demonstration
EXPLAIN SELECT * FROM Ride
WHERE PickupLocationID=1 AND DropLocationID=2 AND RideDate='2026-10-15';
