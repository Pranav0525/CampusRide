USE CampusRide;

-- Available rides
SELECT * FROM Ride WHERE RideStatus='OPEN' AND AvailableSeats>0;

-- VIT Chennai -> Airport
SELECT R.RideID,S.StudentName AS Creator,LP.LocationName AS Pickup,
       LD.LocationName AS Destination,R.RideDate,R.RideTime,
       C.CabApp,C.VehicleType,R.TotalFare,R.AvailableSeats
FROM Ride R
JOIN Student S ON R.CreatorID=S.StudentID
JOIN Location LP ON R.PickupLocationID=LP.LocationID
JOIN Location LD ON R.DropLocationID=LD.LocationID
LEFT JOIN Cab_Details C ON R.CabID=C.CabID
WHERE LP.LocationName='VIT Chennai'
  AND LD.LocationName='Chennai Airport';

-- Passengers in a ride
SELECT S.StudentName,B.BookingStatus,B.IndividualFare
FROM Booking B JOIN Student S ON B.StudentID=S.StudentID
WHERE B.RideID=1;

-- Number of accepted passengers per ride
SELECT R.RideID,COUNT(B.BookingID) AS AcceptedPassengers
FROM Ride R LEFT JOIN Booking B
ON R.RideID=B.RideID AND B.BookingStatus='ACCEPTED'
GROUP BY R.RideID;

-- Rides above average fare
SELECT * FROM Ride
WHERE TotalFare>(SELECT AVG(TotalFare) FROM Ride);

-- Students with at least one booking
SELECT S.StudentID,S.StudentName
FROM Student S
WHERE EXISTS (SELECT 1 FROM Booking B WHERE B.StudentID=S.StudentID);

-- Popular destinations
SELECT L.LocationName,COUNT(R.RideID) AS RideCount
FROM Location L JOIN Ride R ON L.LocationID=R.DropLocationID
GROUP BY L.LocationID,L.LocationName
ORDER BY RideCount DESC;