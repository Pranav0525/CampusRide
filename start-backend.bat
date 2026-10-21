@echo off
title CampusRide - Spring Boot Backend
color 0B
echo ========================================================
echo         CampusRide Spring Boot REST API Server
echo ========================================================
echo.
echo Database: MySQL 8.0 (campusride)
echo Starting server on http://localhost:8080...
echo.

cd /d "%~dp0backend"

if exist "target\campusride-backend-0.0.1-SNAPSHOT.jar" (
    java -jar target\campusride-backend-0.0.1-SNAPSHOT.jar
) else (
    echo Building and running with Maven...
    call mvn.cmd spring-boot:run
)

pause
