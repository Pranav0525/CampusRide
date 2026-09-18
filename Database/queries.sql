USE CampusRide;

-- 1. Find rides with available seats
SELECT *
FROM Rides
WHERE AvailableSeats > 0;


-- 2. Find rides from VIT Chennai to Chennai Airport
SELECT
    R.RideID,
    L1.LocationName AS Pickup,
    L2.LocationName AS DropLocation,
    R.StartDateTime,
    R.AvailableSeats,
    R.EstimatedFare
FROM Rides R
JOIN Locations L1
    ON R.PickupLocationID = L1.LocationID
JOIN Locations L2
    ON R.DropLocationID = L2.LocationID
WHERE L1.LocationName = 'VIT Chennai'
  AND L2.LocationName = 'Chennai Airport';


-- 3. Show members of Ride 1
SELECT
    R.RideID,
    U.Name,
    U.Email,
    U.Gender,
    RM.MemberStatus
FROM RideMembers RM
JOIN Users U
    ON RM.UserID = U.UserID
JOIN Rides R
    ON RM.RideID = R.RideID
WHERE R.RideID = 1;


-- 4. Show rides joined by User 2
SELECT
    U.Name,
    R.RideID,
    L1.LocationName AS Pickup,
    L2.LocationName AS DropLocation,
    R.StartDateTime,
    RM.MemberStatus
FROM RideMembers RM
JOIN Users U
    ON RM.UserID = U.UserID
JOIN Rides R
    ON RM.RideID = R.RideID
JOIN Locations L1
    ON R.PickupLocationID = L1.LocationID
JOIN Locations L2
    ON R.DropLocationID = L2.LocationID
WHERE U.UserID = 2;


-- 5. Show complete ride information
SELECT
    R.RideID,
    U.Name AS Creator,
    L1.LocationName AS Pickup,
    L2.LocationName AS DropLocation,
    R.StartDateTime,
    R.EstimatedEndDateTime,
    C.CabProvider,
    C.CabType,
    C.BookingStatus,
    R.TotalSeats,
    R.AvailableSeats,
    R.GenderPreference,
    R.EstimatedFare
FROM Rides R
JOIN Users U
    ON R.CreatorID = U.UserID
JOIN Locations L1
    ON R.PickupLocationID = L1.LocationID
JOIN Locations L2
    ON R.DropLocationID = L2.LocationID
LEFT JOIN CabDetails C
    ON R.RideID = C.RideID;