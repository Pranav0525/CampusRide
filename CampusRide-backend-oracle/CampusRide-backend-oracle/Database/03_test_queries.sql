-- Run as CAMPUSRIDE after the schema and location seed have been loaded.

SELECT UserID, Name, StudentID, Email, Gender FROM Users;

SELECT LocationID, LocationName FROM Locations ORDER BY LocationID;

SELECT RideID, CreatorID, PickupLocationID, DropLocationID,
       StartDateTime, AvailableSeats, TotalSeats, CabProvider, EstimatedFare
FROM Rides
ORDER BY StartDateTime;

-- Confirm the route data that the backend will search.
SELECT r.RideID,
       u.Name AS Creator,
       p.LocationName AS Pickup,
       d.LocationName AS DropLocation,
       r.AvailableSeats,
       r.CabProvider
FROM Rides r
JOIN Users u ON u.UserID = r.CreatorID
JOIN Locations p ON p.LocationID = r.PickupLocationID
JOIN Locations d ON d.LocationID = r.DropLocationID;
