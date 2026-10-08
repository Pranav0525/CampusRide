USE CampusRide;
CREATE INDEX idx_ride_route_date ON Ride(PickupLocationID, DropLocationID, RideDate);
CREATE INDEX idx_ride_status_date ON Ride(RideStatus, RideDate);
CREATE INDEX idx_booking_student_status ON Booking(StudentID, BookingStatus);
CREATE INDEX idx_booking_ride_status ON Booking(RideID, BookingStatus);