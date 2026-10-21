-- CampusRide Sample Data (MySQL 8.0)
-- Default password for all demo users: password123
-- BCrypt Hash: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy

USE CampusRide;

-- Clear previous data in correct foreign key order
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE Ratings;
TRUNCATE TABLE Bookings;
TRUNCATE TABLE CabDetails;
TRUNCATE TABLE RideMembers;
TRUNCATE TABLE Rides;
TRUNCATE TABLE Locations;
TRUNCATE TABLE Users;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Insert Users (Password: password123)
INSERT INTO Users (UserID, Name, StudentID, Email, Phone, Gender, PasswordHash) VALUES
(1, 'Pranav Agarwal', '25BCE5204', 'pranav@example.com', '9876500001', 'Male', '$2a$10$IbQT7OtcxZVD530QUkFQWegJZdaM/zQHCHXYBVPqmL29Zkg7lEAMC'),
(2, 'Rachit Malik', '25BCE5140', 'rachit@example.com', '9876500002', 'Male', '$2a$10$IbQT7OtcxZVD530QUkFQWegJZdaM/zQHCHXYBVPqmL29Zkg7lEAMC'),
(3, 'Shayan Rustomji', '25BCE5546', 'shayan@example.com', '9876500003', 'Male', '$2a$10$IbQT7OtcxZVD530QUkFQWegJZdaM/zQHCHXYBVPqmL29Zkg7lEAMC'),
(4, 'Ananya Iyer', '25BCE5012', 'ananya@example.com', '9876500004', 'Female', '$2a$10$IbQT7OtcxZVD530QUkFQWegJZdaM/zQHCHXYBVPqmL29Zkg7lEAMC'),
(5, 'Sneha Nair', '25BCE5088', 'sneha@example.com', '9876500005', 'Female', '$2a$10$IbQT7OtcxZVD530QUkFQWegJZdaM/zQHCHXYBVPqmL29Zkg7lEAMC'),
(6, 'Rahul Sharma', '25BCE5199', 'rahul@example.com', '9876500006', 'Male', '$2a$10$IbQT7OtcxZVD530QUkFQWegJZdaM/zQHCHXYBVPqmL29Zkg7lEAMC'),
(7, 'Riya Shah', '25BCE5345', 'riya@example.com', '9876500007', 'Female', '$2a$10$IbQT7OtcxZVD530QUkFQWegJZdaM/zQHCHXYBVPqmL29Zkg7lEAMC'),
(8, 'Arjun Mehta', '25BCE5421', 'arjun@example.com', '9876500008', 'Male', '$2a$10$IbQT7OtcxZVD530QUkFQWegJZdaM/zQHCHXYBVPqmL29Zkg7lEAMC');

-- 2. Insert Locations
INSERT INTO Locations (LocationID, LocationName, Address) VALUES
(1, 'VIT Chennai', 'Vandalur-Kelambakkam Road, Chennai 600127'),
(2, 'Chennai Airport', 'GST Road, Meenambakkam, Chennai 600027'),
(3, 'Chennai Central', 'Kannappar Thidal, Periyamet, Chennai 600003'),
(4, 'Tambaram Station', 'GST Road, Tambaram West, Chennai 600045'),
(5, 'Guindy', 'Guindy Industrial Estate, Chennai 600032'),
(6, 'T. Nagar', 'Thyagaraya Nagar, Chennai 600017'),
(7, 'Velachery', 'Velachery Bypass Road, Chennai 600042'),
(8, 'Chromepet', 'GST Road, Chromepet, Chennai 600044'),
(9, 'Mahabalipuram', 'East Coast Road, Mamallapuram 603104'),
(10, 'Sholinganallur', 'OMR-IT Corridor Junction, Chennai 600119'),
(11, 'OMR (IT Corridor)', 'Rajiv Gandhi Salai, Chennai 600096'),
(12, 'Egmore', 'Kennet Lane, Egmore, Chennai 600008');

-- 3. Insert Rides
INSERT INTO Rides (RideID, CreatorID, PickupLocationID, DropLocationID, StartDateTime, EstimatedEndDateTime, CabType, CabProvider, TotalSeats, AvailableSeats, GenderPreference, EstimatedFare, BookingScreenshot, Notes) VALUES
(1, 1, 1, 2, '2026-10-25 18:00:00', '2026-10-25 19:15:00', 'Sedan', 'Uber', 4, 2, 'Any', 900.00, NULL, 'Heading home for weekend break. Flight at 9:30 PM.'),
(2, 4, 1, 3, '2026-10-26 09:00:00', '2026-10-26 10:15:00', 'SUV', 'Ola', 5, 3, 'Female', 1200.00, NULL, 'Going for shopping & cafe hopping. Female co-riders preferred.'),
(3, 2, 1, 4, '2026-10-26 17:30:00', '2026-10-26 18:15:00', 'Auto', 'Rapido', 2, 1, 'Any', 250.00, NULL, 'Catching evening train from Tambaram station.'),
(4, 6, 2, 1, '2026-10-27 22:00:00', '2026-10-27 23:15:00', 'Sedan', 'Uber', 4, 3, 'Any', 950.00, NULL, 'Landing at Chennai airport terminal 2. Looking for campus cab pool.'),
(5, 3, 1, 5, '2026-10-28 10:00:00', '2026-10-28 11:00:00', 'Sedan', 'Ola', 4, 0, 'Male', 700.00, NULL, 'Tech conference in Guindy. Ride is now full.'),
(6, 8, 1, 9, '2026-10-29 06:30:00', '2026-10-29 07:45:00', 'SUV', 'Other', 6, 0, 'Any', 1500.00, NULL, 'Trip cancelled due to change in schedule.');

-- 4. Insert RideMembers (Creator automatically added + confirmed members)
INSERT INTO RideMembers (RideMemberID, RideID, UserID, JoinedAt, MemberStatus, IndividualFare) VALUES
(1, 1, 1, '2026-10-20 10:00:00', 'Creator', 450.00),
(2, 1, 6, '2026-10-20 11:30:00', 'Joined', 450.00),
(3, 2, 4, '2026-10-20 12:00:00', 'Creator', 600.00),
(4, 2, 5, '2026-10-20 13:15:00', 'Joined', 600.00),
(5, 3, 2, '2026-10-20 14:00:00', 'Creator', 125.00),
(6, 4, 6, '2026-10-20 15:00:00', 'Creator', 950.00),
(7, 5, 3, '2026-10-20 16:00:00', 'Creator', 175.00),
(8, 5, 1, '2026-10-20 16:30:00', 'Joined', 175.00),
(9, 5, 2, '2026-10-20 17:00:00', 'Joined', 175.00),
(10, 5, 8, '2026-10-20 17:15:00', 'Joined', 175.00),
(11, 6, 8, '2026-10-20 18:00:00', 'Creator', 1500.00);

-- 5. Insert CabDetails
INSERT INTO CabDetails (CabDetailID, RideID, CabProvider, CabType, BookingReference, BookingStatus, DriverName, DriverPhone, VehicleNumber, VehicleColor) VALUES
(1, 1, 'Uber', 'Sedan', 'UBER-98214', 'Booked', 'Murugan R', '9840112233', 'TN 07 CM 4521', 'Silver'),
(2, 2, 'Ola', 'SUV', 'OLA-44219', 'Booked', 'Karthik S', '9840223344', 'TN 14 AX 8890', 'White'),
(3, 3, 'Rapido', 'Auto', 'RAP-11029', 'Booked', 'Selvam', '9840334455', 'TN 22 B 6712', 'Yellow/Green'),
(4, 4, 'Uber', 'Sedan', NULL, 'Not_Booked', NULL, NULL, NULL, NULL),
(5, 5, 'Ola', 'Sedan', 'OLA-77291', 'Booked', 'Vignesh K', '9840445566', 'TN 09 DE 1144', 'Grey'),
(6, 6, 'Other', 'SUV', NULL, 'Cancelled', NULL, NULL, NULL, NULL);

-- 6. Insert Bookings (Pending, Accepted, Rejected)
INSERT INTO Bookings (BookingID, RideID, UserID, Status, RequestedAt, RespondedAt, IndividualFare) VALUES
(1, 1, 6, 'Accepted', '2026-10-20 11:00:00', '2026-10-20 11:30:00', 450.00),
(2, 1, 7, 'Pending', '2026-10-20 14:20:00', NULL, NULL),
(3, 2, 5, 'Accepted', '2026-10-20 13:00:00', '2026-10-20 13:15:00', 600.00),
(4, 2, 7, 'Pending', '2026-10-20 15:45:00', NULL, NULL),
(5, 3, 1, 'Pending', '2026-10-20 16:10:00', NULL, NULL),
(6, 4, 3, 'Rejected', '2026-10-20 17:00:00', '2026-10-20 17:30:00', NULL);

-- 7. Insert Ratings & Reviews
INSERT INTO Ratings (RatingID, RideID, UserID, RatingValue, CommentText) VALUES
(1, 1, 6, 5, 'Great coordination and reached the airport well on time!'),
(2, 2, 5, 5, 'Very comfortable journey, safe and smooth driving.'),
(3, 5, 1, 4, 'Cab was neat and on time, split fare was very affordable.'),
(4, 5, 2, 5, 'Super convenient! Will definitely coordinate rides again.'),
(5, 5, 8, 4, 'Good trip, driver took the fastest route through Guindy.');