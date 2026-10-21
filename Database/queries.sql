-- CampusRide SQL Queries & DBMS Demonstrations
-- Team: Pranav Agarwal (25BCE5204), Shayan Rustomji (25BCE5546), Rachit Malik (25BCE5140)
-- Database Systems Evaluation Queries

USE CampusRide;

-- ============================================================
-- 1. BASIC RETRIEVAL & FILTERING
-- ============================================================

-- Query 1.1: List all currently open rides with available seats
SELECT 
    RideID,
    CabProvider,
    CabType,
    AvailableSeats,
    TotalSeats,
    EstimatedFare,
    StartDateTime
FROM Rides
WHERE AvailableSeats > 0
ORDER BY StartDateTime ASC;

-- Query 1.2: Find rides from VIT Chennai to Chennai Airport
SELECT 
    r.RideID,
    u.Name AS CreatorName,
    l1.LocationName AS Pickup,
    l2.LocationName AS DropLocation,
    r.StartDateTime,
    r.AvailableSeats,
    r.EstimatedFare,
    r.GenderPreference
FROM Rides r
JOIN Users u ON r.CreatorID = u.UserID
JOIN Locations l1 ON r.PickupLocationID = l1.LocationID
JOIN Locations l2 ON r.DropLocationID = l2.LocationID
WHERE l1.LocationName = 'VIT Chennai'
  AND l2.LocationName = 'Chennai Airport'
  AND r.AvailableSeats > 0;

-- ============================================================
-- 2. MULTI-TABLE JOINS (Ride Members & Cab Details)
-- ============================================================

-- Query 2.1: Show all confirmed members and creator for a specific ride (Ride #1)
SELECT 
    r.RideID,
    u.Name AS StudentName,
    u.StudentID,
    u.Email,
    u.Phone,
    rm.MemberStatus,
    rm.JoinedAt,
    rm.IndividualFare
FROM RideMembers rm
JOIN Users u ON rm.UserID = u.UserID
JOIN Rides r ON rm.RideID = r.RideID
WHERE r.RideID = 1
ORDER BY rm.MemberStatus DESC, rm.JoinedAt ASC;

-- Query 2.2: Complete Ride Details including Driver and Vehicle info
SELECT 
    r.RideID,
    u.Name AS Creator,
    l1.LocationName AS Pickup,
    l2.LocationName AS Destination,
    r.StartDateTime,
    r.CabProvider,
    r.CabType,
    r.EstimatedFare,
    r.AvailableSeats,
    c.DriverName,
    c.DriverPhone,
    c.VehicleNumber,
    c.BookingStatus AS CabStatus
FROM Rides r
JOIN Users u ON r.CreatorID = u.UserID
JOIN Locations l1 ON r.PickupLocationID = l1.LocationID
JOIN Locations l2 ON r.DropLocationID = l2.LocationID
LEFT JOIN CabDetails c ON r.RideID = c.RideID;

-- ============================================================
-- 3. AGGREGATIONS & GROUP BY (DBMS Metrics)
-- ============================================================

-- Query 3.1: Route popularity analysis (Count, Average Fare, Passenger count)
SELECT 
    l1.LocationName AS Pickup,
    l2.LocationName AS Destination,
    COUNT(r.RideID) AS TotalRides,
    ROUND(AVG(r.EstimatedFare), 2) AS AverageFare,
    MIN(r.EstimatedFare) AS LowestFare,
    MAX(r.EstimatedFare) AS HighestFare,
    SUM(r.TotalSeats - r.AvailableSeats) AS TotalRidersJoined
FROM Rides r
JOIN Locations l1 ON r.PickupLocationID = l1.LocationID
JOIN Locations l2 ON r.DropLocationID = l2.LocationID
GROUP BY l1.LocationName, l2.LocationName
ORDER BY TotalRides DESC;

-- Query 3.2: Most active student cab coordinators (Rides created >= 1)
SELECT 
    u.UserID,
    u.Name,
    u.StudentID,
    u.Email,
    COUNT(r.RideID) AS RidesCreated,
    SUM(r.EstimatedFare) AS TotalFareCoordinated
FROM Users u
JOIN Rides r ON u.UserID = r.CreatorID
GROUP BY u.UserID, u.Name, u.StudentID, u.Email
HAVING COUNT(r.RideID) >= 1
ORDER BY RidesCreated DESC;

-- Query 3.3: Average rating and review count per ride
SELECT 
    r.RideID,
    l1.LocationName AS Pickup,
    l2.LocationName AS Destination,
    u.Name AS Creator,
    ROUND(AVG(rt.RatingValue), 2) AS AverageRating,
    COUNT(rt.RatingID) AS TotalReviews
FROM Rides r
JOIN Users u ON r.CreatorID = u.UserID
JOIN Locations l1 ON r.PickupLocationID = l1.LocationID
JOIN Locations l2 ON r.DropLocationID = l2.LocationID
LEFT JOIN Ratings rt ON r.RideID = rt.RideID
GROUP BY r.RideID, l1.LocationName, l2.LocationName, u.Name;

-- ============================================================
-- 4. SUBQUERIES & COMPLEX FILTERS
-- ============================================================

-- Query 4.1: Students who have pending join requests waiting for response
SELECT 
    b.BookingID,
    u.Name AS PassengerName,
    u.Email AS PassengerEmail,
    creator.Name AS RideCreator,
    l1.LocationName AS Pickup,
    l2.LocationName AS Destination,
    r.StartDateTime,
    b.RequestedAt
FROM Bookings b
JOIN Users u ON b.UserID = u.UserID
JOIN Rides r ON b.RideID = r.RideID
JOIN Users creator ON r.CreatorID = creator.UserID
JOIN Locations l1 ON r.PickupLocationID = l1.LocationID
JOIN Locations l2 ON r.DropLocationID = l2.LocationID
WHERE b.Status = 'Pending';

-- Query 4.2: Find rides that are cheaper than the overall average fare
SELECT 
    r.RideID,
    l1.LocationName AS Pickup,
    l2.LocationName AS Destination,
    r.EstimatedFare,
    (SELECT ROUND(AVG(EstimatedFare), 2) FROM Rides) AS OverallAverageFare
FROM Rides r
JOIN Locations l1 ON r.PickupLocationID = l1.LocationID
JOIN Locations l2 ON r.DropLocationID = l2.LocationID
WHERE r.EstimatedFare < (SELECT AVG(EstimatedFare) FROM Rides);

-- ============================================================
-- 5. DATABASE VIEWS USAGE
-- ============================================================

-- Query 5.1: Querying the Denormalized Ride View
SELECT * FROM vw_ride_details WHERE RideStatus = 'Open';

-- Query 5.2: Querying the Popular Routes View
SELECT * FROM vw_popular_routes;

-- Query 5.3: Querying User Activity Stats View
SELECT * FROM vw_user_stats;