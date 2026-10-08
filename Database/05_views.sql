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