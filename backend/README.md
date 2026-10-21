# CampusRide Backend — Oracle XE

Spring Boot REST backend for the CampusRide DBMS project.

## Stack
- Java 17+
- Spring Boot 3.5.6
- Spring Web
- Spring Data JPA / Hibernate
- Oracle XE
- Oracle JDBC ojdbc11

## Architecture
React/Vite -> Spring Boot REST API -> JPA/Hibernate -> Oracle XE

## Oracle setup
1. Connect to the XEPDB1 service as SYSTEM.
2. Run `Database/00_create_oracle_user.sql`.
3. Reconnect as CAMPUSRIDE to XEPDB1.
4. Run `Database/01_schema_oracle.sql`.
5. Run `Database/02_seed_locations.sql`.
6. Verify using `Database/03_test_queries.sql`.

Default application credentials:
- URL: jdbc:oracle:thin:@localhost:1521/XEPDB1
- User: CAMPUSRIDE
- Password: campusride

If your Oracle XE service is different, change `src/main/resources/application.properties` or set DB_URL/DB_USERNAME/DB_PASSWORD environment variables.

## Start backend
From this folder:

    mvn spring-boot:run

The server runs on http://localhost:8080.

## First test
Open:

    http://localhost:8080/api/health

Expected JSON:

    {"status":"UP","service":"CampusRide Backend"}

Then use `Database/api-examples.http` in IntelliJ/VS Code REST Client/Postman.

## Important flow
- Register creates a User.
- Create Ride creates a Ride and its creator RideMember.
- Join Ride creates a Pending Booking; it does not immediately consume a seat.
- Accept Booking runs a transaction that decrements AvailableSeats and creates a confirmed RideMember.
- Reject Booking leaves AvailableSeats unchanged.

## Frontend
CORS is enabled for http://localhost:5173 so the existing Vite frontend can call this backend.
