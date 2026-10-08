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