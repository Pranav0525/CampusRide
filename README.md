# 🚕 CampusRide — Full-Stack DBMS Project

> **Campus Shared Cab Coordination System**  
> **Course**: Database Systems (DBMS Project) — VIT Chennai  
> **Team Members**:  
> - **Pranav Agarwal** (25BCE5204) — Database & Data Design (Schema, Constraints, Views, Seed Data)  
> - **Shayan Rustomji** (25BCE5546) — Backend & Application Logic (Spring Boot REST API, JPA, Transactions)  
> - **Rachit Malik** (25BCE5140) — Frontend & User Interface (React, Vite, Tailwind CSS, Navigation)  

---

## 📁 Clean Project Structure

```
CampusRide-CampusRide-With-Backend/
├── backend/                  # Spring Boot 3.4.3 REST API (Java 17+)
│   ├── src/                  # Controllers, Entities, Repositories, Services
│   ├── target/               # Compiled runnable JAR (campusride-backend.jar)
│   ├── pom.xml               # Maven dependencies (Spring Boot, MySQL Connector)
│   └── mvn.cmd               # Maven wrapper script
├── frontend/                 # React 19 + Vite + Tailwind CSS
│   ├── src/                  # Components, Pages, Services, Router
│   ├── public/               # Static assets
│   ├── package.json          # Dependencies (React, Lucide, React Router)
│   └── vite.config.js        # Vite config
├── Database/                 # MySQL 8.0 Database Assets
│   ├── schema.sql            # 7 normalized tables + 3 SQL Views + constraints
│   ├── sample_data.sql       # Seed data (demo students, Chennai locations, rides)
│   └── queries.sql           # Evaluation SQL queries (JOINs, aggregations, subqueries)
├── CampusRide2.0.pptx        # Review Presentation Slides
├── start-backend.bat         # 1-Click launcher for Backend (Port 8080)
├── start-frontend.bat        # 1-Click launcher for Frontend (Port 5173)
└── README.md                 # Project documentation
```

---

## 🚀 Quick Start (One-Click)

### 1. Database
Make sure **MySQL 8.0** is running. The database `campusride` is already populated.
If you ever need to reload it:
```cmd
mysql -u root -p < Database\schema.sql
mysql -u root -p < Database\sample_data.sql
```

### 2. Start Backend (Port 8080)
Double-click [**`start-backend.bat`**](file:///c:/Users/Pranav/Downloads/CampusRide-CampusRide-With-Backend/start-backend.bat)  
*(Starts Spring Boot server on http://localhost:8080)*

### 3. Start Frontend (Port 5173)
Double-click [**`start-frontend.bat`**](file:///c:/Users/Pranav/Downloads/CampusRide-CampusRide-With-Backend/start-frontend.bat)  
*(Starts React Vite dev server on http://localhost:5173)*

### 4. Open in Browser
Open **[http://localhost:5173](http://localhost:5173)**

---

## 🔑 Demo Accounts (All passwords: `password123`)

| Student Name | Email (Identifier) | Student ID | Role / Notes |
|---|---|---|---|
| **Pranav Agarwal** | `pranav@example.com` | `25BCE5204` | Creator of Ride #1 (Airport) |
| **Rachit Malik** | `rachit@example.com` | `25BCE5140` | Creator of Ride #3 (Tambaram) |
| **Shayan Rustomji** | `shayan@example.com` | `25BCE5546` | Creator of Ride #5 (Guindy) |
| **Ananya Iyer** | `ananya@example.com` | `25BCE5012` | Creator of Ride #2 (Central) |
| **Sneha Nair** | `sneha@example.com` | `25BCE5088` | Passenger in Ride #2 |
| **Rahul Sharma** | `rahul@example.com` | `25BCE5199` | Passenger in Ride #1 |

---

## 💻 Application Screens & Routes

| Screen | Route | Description |
|---|---|---|
| **Login / Register** | `/`, `/login`, `/register` | Student authentication with BCrypt encryption |
| **Dashboard** | `/dashboard` | Live metrics, quick actions, recent activity |
| **Search Rides** | `/search` | Multi-field filtering (route, date, seats, vehicle) |
| **Create Ride** | `/create` | Form to publish route, cab provider, fare, driver info |
| **Ride Details** | `/ride/:id` | Route details, fare splitting, passenger reviews, join request |
| **My Rides** | `/my-rides` | Tabbed view of hosted vs. joined rides, with cancel action |
| **My Bookings** | `/my-bookings` | Track status of join requests (Pending, Accepted, Rejected) |
| **DBMS Analytics** | `/admin` | Review evaluation page displaying SQL View results (`vw_popular_routes`) |
