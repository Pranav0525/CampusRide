# CampusRide — Frontend Technology Stack

> **Member 3 (Frontend & UX)** — Rachit Malik (25BCE5140)  
> DBMS Project — Database Systems

---

## Technology Choices

| Layer           | Technology       | Version  | Purpose                                  |
|-----------------|------------------|----------|------------------------------------------|
| **Framework**   | React            | 18.x     | Component-based UI library               |
| **Build Tool**  | Vite             | 6.x      | Fast dev server & production bundler     |
| **Styling**     | Tailwind CSS     | 4.x      | Utility-first CSS framework              |
| **Routing**     | React Router DOM | 7.x      | Client-side page navigation              |
| **Icons**       | Lucide React     | latest   | Consistent icon set                      |
| **Language**    | JavaScript (ES6+)| —        | Modern JS with JSX                       |

---

## Full Stack Architecture

```
┌─────────────────────────────────────────────────┐
│                   Frontend                       │
│          React + Vite + Tailwind CSS             │
│     (Member 3 — Rachit Malik, 25BCE5140)         │
└─────────────────────┬───────────────────────────┘
                      │ REST API (JSON)
                      ▼
┌─────────────────────────────────────────────────┐
│                   Backend                        │
│              Spring Boot (Java)                  │
│     (Member 2 — Pranav Agarwal, 25BCE5204)       │
└─────────────────────┬───────────────────────────┘
                      │ JDBC / JPA
                      ▼
┌─────────────────────────────────────────────────┐
│                   Database                       │
│                    MySQL                         │
│     (Member 1 — Shayan Rustomji, 25BCE5546)      │
└─────────────────────────────────────────────────┘
```

---

## Why These Choices?

### React
- Industry-standard for building interactive UIs
- Component-based architecture matches our entity model (RideCard, SearchForm, etc.)
- Rich ecosystem for future enhancements

### Vite
- Near-instant hot module replacement (HMR) during development
- Optimized production builds
- Native ES modules — no bundler overhead

### Tailwind CSS
- Rapid prototyping with utility classes
- No custom CSS files needed
- Consistent design system (teal/green campus theme)
- Mobile-responsive by default

### React Router DOM
- Declarative routing matches our user flows
- URL-based navigation (e.g., `/ride/1` for ride details)
- Supports nested layouts (Navbar on protected routes)

---

## Project Structure

```
campusride-frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Navbar.jsx   # Navigation bar
│   │   └── RideCard.jsx # Ride summary card
│   ├── pages/           # Page-level components
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── CreateRidePage.jsx
│   │   ├── SearchRidesPage.jsx
│   │   └── RideDetailsPage.jsx
│   ├── data/
│   │   └── mockData.js  # Sample data for demos
│   ├── App.jsx          # Router configuration
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind imports
├── docs/
│   ├── user-flows.md    # User flow diagrams
│   └── tech-stack.md    # This document
├── package.json
├── vite.config.js
└── README.md
```

---

## Screens Implemented (Review 1)

| #  | Screen           | Route        | Status    |
|----|------------------|-------------|-----------|
| 1  | Login            | `/`         | ✅ Done   |
| 2  | Register         | `/register` | ✅ Done   |
| 3  | Dashboard        | `/dashboard`| ✅ Done   |
| 4  | Create Ride      | `/create`   | ✅ Done   |
| 5  | Search Rides     | `/search`   | ✅ Done   |
| 6  | Ride Details     | `/ride/:id` | ✅ Done   |

---

## Screens Planned (Phase 2+)

| Screen                | Route          | Depends On       |
|-----------------------|----------------|------------------|
| My Rides              | `/my-rides`    | Backend API      |
| My Bookings           | `/my-bookings` | Backend API      |
| Booking Status        | `/booking/:id` | Backend API      |
| Rating/Review         | —              | Booking entity   |
| Admin Dashboard       | `/admin`       | Admin role logic  |

---

*Document prepared for Review 1 presentation — CampusRide DBMS Project*
