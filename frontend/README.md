# 🚕 CampusRide — Frontend

A Database-Driven Campus Ride Sharing Management System.

> **DBMS Project** — VIT Chennai  
> Team: Rachit Malik (25BCE5140), Pranav Agarwal (25BCE5204), Shayan Rustomji (25BCE5546)

---

## Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ installed

### Install & Run

```bash
# Navigate to the frontend directory
cd campusride-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at **http://localhost:5173**

### Build for Production

```bash
npm run build
```

---

## Tech Stack

| Technology       | Purpose                          |
|------------------|----------------------------------|
| React 18         | UI framework                     |
| Vite             | Build tool & dev server          |
| Tailwind CSS 4   | Styling                          |
| React Router DOM | Client-side routing              |
| Lucide React     | Icons                            |

---

## Screens (Review 1)

| Screen         | Route        | Description                               |
|----------------|-------------|-------------------------------------------|
| Login          | `/`         | Student authentication                    |
| Register       | `/register` | New student registration                  |
| Dashboard      | `/dashboard`| Central hub with quick actions            |
| Create Ride    | `/create`   | Form to publish a new shared ride         |
| Search Rides   | `/search`   | Search & filter available rides           |
| Ride Details   | `/ride/:id` | Full ride info + Request to Join          |

---

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Navbar.jsx
│   └── RideCard.jsx
├── pages/              # Page components (one per route)
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DashboardPage.jsx
│   ├── CreateRidePage.jsx
│   ├── SearchRidesPage.jsx
│   └── RideDetailsPage.jsx
├── data/
│   └── mockData.js     # Sample data (replaced by APIs later)
├── App.jsx             # Router configuration
├── main.jsx            # Entry point
└── index.css           # Tailwind CSS imports
```

---

## Database Entities (Frontend Mapping)

| Entity   | Frontend Usage                                    |
|----------|---------------------------------------------------|
| User     | Login, Register, Creator info on rides            |
| Vehicle  | Optional driver/vehicle fields in Create Ride     |
| Location | Pickup & Drop dropdowns                           |
| Ride     | Create Ride form, Search results, Ride details    |
| Booking  | "Request to Join" action, booking status display  |
| Rating   | Planned for Phase 2                               |

---

## Documentation

- [User Flows](docs/user-flows.md) — Passenger & Ride Creator flowcharts
- [Tech Stack](docs/tech-stack.md) — Technology choices & architecture

---

*Member 3 (Frontend & UX) — Rachit Malik (25BCE5140)*
