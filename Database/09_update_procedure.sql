USE CampusRide;
DROP PROCEDURE IF EXISTS JoinRide;
DELIMITER //
CREATE PROCEDURE JoinRide(
 IN p_ride_id INT,
 IN p_student_id INT,
 IN p_individual_fare DECIMAL(10,2)
)
BEGIN
 DECLARE v_available INT;
 DECLARE v_status VARCHAR(20);
 DECLARE v_existing INT DEFAULT 0;

 START TRANSACTION;

 SELECT AvailableSeats, RideStatus
 INTO v_available, v_status
 FROM Ride
 WHERE RideID = p_ride_id
 FOR UPDATE;

 SELECT COUNT(*)
 INTO v_existing
 FROM Booking
 WHERE RideID = p_ride_id
   AND StudentID = p_student_id
   AND BookingStatus IN ('PENDING','ACCEPTED');

 IF v_existing > 0 THEN
   ROLLBACK;
   SIGNAL SQLSTATE '45000'
     SET MESSAGE_TEXT = 'Student already has an active booking/request';
 ELSEIF v_status <> 'OPEN' OR v_available <= 0 THEN
   ROLLBACK;
   SIGNAL SQLSTATE '45000'
     SET MESSAGE_TEXT = 'Ride is not available';
 ELSEIF p_individual_fare < 0 THEN
   ROLLBACK;
   SIGNAL SQLSTATE '45000'
     SET MESSAGE_TEXT = 'Individual fare cannot be negative';
 ELSE
   INSERT INTO Booking(RideID, StudentID, BookingStatus, IndividualFare)
   VALUES(p_ride_id, p_student_id, 'ACCEPTED', p_individual_fare);

   UPDATE Ride
   SET AvailableSeats = AvailableSeats - 1,
       RideStatus = CASE
         WHEN AvailableSeats - 1 = 0 THEN 'FULL'
         ELSE 'OPEN'
       END
   WHERE RideID = p_ride_id;

   COMMIT;
 END IF;
END //
DELIMITER ;

-- Verify the procedure exists:
SHOW PROCEDURE STATUS WHERE Db = 'CampusRide' AND Name = 'JoinRide';
