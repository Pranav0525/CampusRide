@echo off
title CampusRide - React Frontend
color 0A
echo ========================================================
echo         CampusRide React + Vite Development Server
echo ========================================================
echo.
echo Starting frontend on http://localhost:5173...
echo.

cd /d "%~dp0frontend"

call npm.cmd run dev

pause
