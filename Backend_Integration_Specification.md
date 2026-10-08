# CampusRide — Backend Integration Specification

## Architecture
```text
Frontend → Backend/API → MySQL CampusRide
```
The browser/frontend should not connect directly to MySQL. The backend owns credentials, validation, business logic and SQL/database calls.

## Database handoff
Database: `CampusRide`

Tables:
- `Student`
- `Location`
- `Cab_Details`
- `Ride`
- `Booking`
- `Rating`

Database objects:
- View: `AvailableRides`
- Procedure: `JoinRide`

## Suggested API contract

### GET `/api/rides/available`
Use:
```sql
SELECT * FROM AvailableRides;
```

### GET `/api/rides/:id`
Return one ride with creator, pickup, destination and optional cab details.

### POST `/api/rides`
Create a CampusRide entry. The request should include creator, pickup, destination, date/time, cab app, vehicle type, total fare, seats and preferences.

### POST `/api/rides/:id/join`
Use the existing `JoinRide` procedure. Do not implement the seat decrement as a separate unprotected SELECT + UPDATE sequence.

Inputs: `RideID`, `StudentID`, `IndividualFare`.

### GET `/api/students/:id/bookings`
Return the student's bookings with ride and location information.

### POST `/api/bookings/:id/rating`
Create a rating for a completed booking.

## Environment configuration
Use a local `.env` file:
```text
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=<local-password>
DB_NAME=CampusRide
```
Never commit the password or `.env` to GitHub.

## Integration test sequence
1. Start MySQL.
2. Start the backend.
3. Verify the backend connects to `CampusRide`.
4. Call the available-rides API.
5. Confirm the frontend displays the returned rides.
6. Create a ride and verify the `Ride` row.
7. Join the ride and verify the `Booking` row and `AvailableSeats`.
8. Test two simultaneous joins when only one seat remains.
9. Confirm only one request can consume the final seat.
