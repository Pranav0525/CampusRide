# CampusRide Data Dictionary

| Table | Important columns | Purpose |
|---|---|---|
| Student | StudentID, StudentName, Email, Phone, Gender | CampusRide users |
| Location | LocationID, LocationName, Address | Reusable pickup/drop locations |
| Cab_Details | CabID, CabApp, VehicleType, VehicleNumber, DriverName, DriverPhone | External cab information |
| Ride | RideID, CreatorID, PickupLocationID, DropLocationID, CabID, RideDate, RideTime, TotalFare, TotalSeats, AvailableSeats, GenderPreference, RideStatus | Shared cab ride |
| Booking | BookingID, RideID, StudentID, BookingStatus, IndividualFare, BookingDate | Student participation |
| Rating | RatingID, BookingID, RatingValue, Comment, RatingDate | Post-ride feedback |
