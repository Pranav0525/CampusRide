USE CampusRide;

INSERT INTO Users (Name, Email, Phone, Gender)
VALUES
('Pranav Agarwal', 'pranav@example.com', '9876500001', 'Male'),
('Rahul Sharma', 'rahul@example.com', '9876500002', 'Male'),
('Ananya Iyer', 'ananya@example.com', '9876500003', 'Female'),
('Aditya Kumar', 'aditya@example.com', '9876500004', 'Male'),
('Sneha Nair', 'sneha@example.com', '9876500005', 'Female'),
('Arjun Mehta', 'arjun@example.com', '9876500006', 'Male'),
('Riya Shah', 'riya@example.com', '9876500007', 'Female'),
('Karan Patel', 'karan@example.com', '9876500008', 'Male'),
('Ishita Rao', 'ishita@example.com', '9876500009', 'Female'),
('Vivek Singh', 'vivek@example.com', '9876500010', 'Male');

INSERT INTO Locations (LocationName, Address)
VALUES
('VIT Chennai', 'Vandalur-Kelambakkam Road, Chennai'),
('Chennai Airport', 'Meenambakkam, Chennai'),
('Tambaram Railway Station', 'Tambaram, Chennai'),
('Chennai Central', 'Park Town, Chennai'),
('Chennai Egmore', 'Egmore, Chennai'),
('Marina Mall', 'OMR, Chennai'),
('Guindy', 'Guindy, Chennai'),
('T Nagar', 'T Nagar, Chennai');

INSERT INTO Rides
(
    CreatorID,
    PickupLocationID,
    DropLocationID,
    StartDateTime,
    EstimatedEndDateTime,
    CabType,
    CabProvider,
    TotalSeats,
    AvailableSeats,
    GenderPreference,
    EstimatedFare,
    BookingScreenshot,
    Notes
)
VALUES
(
    1, 1, 2,
    '2026-09-25 18:00:00',
    '2026-09-25 19:00:00',
    'Sedan', 'Uber',
    4, 2, 'Any',
    1000.00,
    NULL,
    'Airport trip after evening classes'
),
(
    3, 1, 3,
    '2026-09-26 09:00:00',
    '2026-09-26 09:45:00',
    'Sedan', 'Ola',
    4, 3, 'Female',
    600.00,
    NULL,
    'Morning trip to Tambaram'
),
(
    6, 1, 4,
    '2026-09-27 07:00:00',
    '2026-09-27 08:15:00',
    'SUV', 'Rapido',
    6, 4, 'Any',
    1200.00,
    NULL,
    'Early morning trip'
),
(
    8, 1, 5,
    '2026-09-27 17:30:00',
    '2026-09-27 18:30:00',
    'Sedan', 'Uber',
    4, 1, 'Any',
    800.00,
    NULL,
    'Evening ride'
),
(
    2, 3, 1,
    '2026-09-28 08:00:00',
    '2026-09-28 08:45:00',
    'Hatchback', 'Other',
    4, 2, 'Any',
    500.00,
    NULL,
    'Return to campus'
);

INSERT INTO RideMembers
(RideID, UserID, MemberStatus)
VALUES
(1, 1, 'Creator'),
(1, 2, 'Joined'),
(2, 3, 'Creator'),
(2, 5, 'Joined'),
(3, 6, 'Creator'),
(3, 10, 'Joined'),
(4, 8, 'Creator'),
(4, 4, 'Joined'),
(5, 2, 'Creator'),
(5, 7, 'Joined');

INSERT INTO CabDetails
(
    RideID,
    CabProvider,
    CabType,
    BookingReference,
    BookingStatus,
    ScreenshotPath
)
VALUES
(
    1, 'Uber', 'Sedan',
    NULL, 'Not Booked', NULL
),
(
    2, 'Ola', 'Sedan',
    'OLA987654', 'Booked',
    'uploads/ola_ride2.jpg'
),
(
    3, 'Rapido', 'SUV',
    NULL, 'Not Booked', NULL
),
(
    4, 'Uber', 'Sedan',
    'UBER456789', 'Booked',
    'uploads/uber_ride4.jpg'
);

INSERT INTO Ratings
(RideID, UserID, RatingValue, Comment)
VALUES
(1, 2, 5, 'Smooth coordination and good communication'),
(2, 5, 4, 'Good experience'),
(3, 10, 5, 'Very convenient'),
(4, 4, 4, 'Everything went well');