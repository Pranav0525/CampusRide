# CampusRide — User Flow Diagrams

> **Member 3 (Frontend & UX)** — Rachit Malik (25BCE5140)  
> DBMS Project — Database Systems

---

## 1. Passenger Flow

A student searching for an existing ride to join:

```
┌──────────┐    ┌──────────────┐    ┌──────────────┐    ┌────────────────┐
│  Login   │───▶│  Dashboard   │───▶│ Search Rides │───▶│ View Ride      │
│  Page    │    │  (Home)      │    │ (Filters)    │    │ Details        │
└──────────┘    └──────────────┘    └──────────────┘    └────────┬───────┘
                                                                 │
                                                                 ▼
                                                        ┌────────────────┐
                                                        │ Request to     │
                                                        │ Join Ride      │
                                                        └────────┬───────┘
                                                                 │
                                                                 ▼
                                                        ┌────────────────┐
                                                        │ Booking Status │
                                                        │ (Pending →     │
                                                        │  Accepted/     │
                                                        │  Rejected)     │
                                                        └────────────────┘
```

### Step-by-step:
1. Student logs in with email/ID and password
2. Dashboard shows quick actions and recent activity
3. Student clicks "Search Rides" and enters filters (pickup, drop, date, time)
4. System queries the **Ride** and **Location** tables and displays matching results
5. Student clicks a ride card to view full details (fare, seats, driver info)
6. Student clicks "Request to Join" → creates a **Booking** record (status: Pending)
7. Ride creator accepts/rejects → **Booking** status updates to Accepted/Rejected
8. Student can view booking history under "My Bookings"

---

## 2. Ride Creator Flow

A student creating a new shared cab ride:

```
┌──────────┐    ┌──────────────┐    ┌──────────────┐    ┌────────────────┐
│  Login   │───▶│  Dashboard   │───▶│ Create Ride  │───▶│ Enter Ride     │
│  Page    │    │  (Home)      │    │ Form         │    │ Details        │
└──────────┘    └──────────────┘    └──────────────┘    └────────┬───────┘
                                                                 │
                                                                 ▼
                                                        ┌────────────────┐
                                                        │ Publish Ride   │
                                                        │ (INSERT into   │
                                                        │  Ride table)   │
                                                        └────────┬───────┘
                                                                 │
                                                                 ▼
                                                        ┌────────────────┐
                                                        │ Manage         │
                                                        │ Requests       │
                                                        │ (Accept/Reject │
                                                        │  Bookings)     │
                                                        └────────────────┘
```

### Step-by-step:
1. Student logs in
2. Dashboard → clicks "Create Ride"
3. Fills in ride details:
   - **Route**: Pickup & Drop locations → stored in **Location** table
   - **Ride info**: Date, time, cab app, vehicle type, fare, seats → stored in **Ride** table
   - **Preferences**: Gender preference, pre-booked status
   - **Optional**: Driver info, vehicle details → stored in **Vehicle** table
4. Clicks "Publish Ride" → INSERT into Ride table with foreign keys to User and Location
5. Other students find this ride via Search
6. Creator receives join requests → UPDATE **Booking** status (Accept/Reject)
7. Ride automatically closes when seats are full

---

## 3. System Flow (Database Interaction)

```
┌─────────┐         ┌──────────┐         ┌──────────────┐
│ Frontend│────────▶│ Backend  │────────▶│   MySQL      │
│ (React) │ REST    │ (Spring  │  JDBC   │   Database   │
│         │◀────────│  Boot)   │◀────────│              │
└─────────┘  JSON   └──────────┘  SQL    └──────────────┘
```

### Tables involved per user action:

| User Action       | API Method | Tables Accessed                    |
|-------------------|------------|-------------------------------------|
| Register          | POST       | User (INSERT)                      |
| Login             | POST       | User (SELECT)                      |
| Create Ride       | POST       | Ride, Location, Vehicle (INSERT)   |
| Search Rides      | GET        | Ride, Location, User (SELECT+JOIN) |
| View Ride Details | GET        | Ride, Location, User, Vehicle, Booking (JOIN) |
| Request to Join   | POST       | Booking (INSERT), Ride (UPDATE seats) |
| Accept/Reject     | PUT        | Booking (UPDATE status)            |
| Rate Ride         | POST       | Rating (INSERT)                    |

---

## 4. Entity Relationships (Quick Reference)

```
User ──owns──▶ Vehicle
User ──creates──▶ Ride
Ride ──has──▶ Location (pickup)
Ride ──has──▶ Location (dropoff)
User ──books──▶ Ride (via Booking)
Booking ──generates──▶ Rating
```

---

*Document prepared for Review 1 presentation — CampusRide DBMS Project*
