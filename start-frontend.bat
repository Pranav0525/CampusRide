@echo off
title CampusRide - React Frontend
color 0A
echo ========================================================
echo         CampusRide React + Vite Development Server
echo ========================================================
echo.

cd /d "%~dp0frontend"

if not exist "node_modules\" (
    echo [INFO] First time setup: Installing npm packages...
    call npm.cmd install
    echo.
)

echo Starting frontend on http://localhost:5173...
echo.
call npm.cmd run dev

pause
