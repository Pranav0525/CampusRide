/**
 * mockData.js — Sample ride data for CampusRide frontend demos.
 * 
 * These mock entries map to the database entities:
 *   - Ride (id, date, time, fare, seats, status, genderPref, cabApp, vehicleType, preBooked)
 *   - User/Creator (creator name)
 *   - Location (pickup, drop)
 *   - Vehicle (vehicleType, vehicleNumber, vehicleColor)
 *   - Booking (simulated via passengers array)
 * 
 * In Phase 3, this will be replaced by API calls to the Spring Boot backend.
 */

export const sampleRides = [
  {
    id: 1,
    creator: 'Aarav Sharma',
    creatorEmail: 'aarav@vitstudent.ac.in',
    creatorPhone: '+91 98765 43210',
    pickup: 'VIT Chennai',
    drop: 'Chennai Airport',
    date: '2026-09-25',
    time: '18:00',
    cabApp: 'Uber',
    vehicleType: 'Sedan',
    fare: 800,
    seats: 3,
    totalSeats: 4,
    genderPref: 'Any',
    preBooked: true,
    driverName: 'Rajesh Kumar',
    driverPhone: '+91 87654 32109',
    vehicleNumber: 'TN 07 AB 1234',
    vehicleColor: 'White',
    additionalNotes: 'Will have 1 large luggage bag. Meeting point: VIT Main Gate.',
    status: 'Open',
    passengers: [
      { name: 'Meera Singh', status: 'Confirmed' },
    ],
  },
  {
    id: 2,
    creator: 'Priya Patel',
    creatorEmail: 'priya@vitstudent.ac.in',
    creatorPhone: '+91 91234 56789',
    pickup: 'VIT Chennai',
    drop: 'Chennai Central',
    date: '2026-09-25',
    time: '14:00',
    cabApp: 'Ola',
    vehicleType: 'SUV',
    fare: 600,
    seats: 2,
    totalSeats: 5,
    genderPref: 'Female Only',
    preBooked: false,
    driverName: '',
    driverPhone: '',
    vehicleNumber: '',
    vehicleColor: '',
    additionalNotes: 'Prefer female co-riders. Going for shopping at Express Avenue.',
    status: 'Open',
    passengers: [
      { name: 'Ananya Roy', status: 'Confirmed' },
      { name: 'Kavya Nair', status: 'Pending' },
    ],
  },
  {
    id: 3,
    creator: 'Rohan Gupta',
    creatorEmail: 'rohan@vitstudent.ac.in',
    creatorPhone: '+91 95551 23456',
    pickup: 'VIT Chennai',
    drop: 'Tambaram Station',
    date: '2026-09-26',
    time: '09:00',
    cabApp: 'Rapido',
    vehicleType: 'Auto',
    fare: 200,
    seats: 1,
    totalSeats: 2,
    genderPref: 'Any',
    preBooked: true,
    driverName: 'Suresh',
    driverPhone: '+91 80001 11111',
    vehicleNumber: 'TN 09 C 5678',
    vehicleColor: 'Green',
    additionalNotes: 'Quick ride to catch the 10 AM train.',
    status: 'Open',
    passengers: [],
  },
  {
    id: 4,
    creator: 'Sneha Reddy',
    creatorEmail: 'sneha@vitstudent.ac.in',
    creatorPhone: '+91 97777 88888',
    pickup: 'Chennai Airport',
    drop: 'VIT Chennai',
    date: '2026-09-27',
    time: '22:00',
    cabApp: 'Uber',
    vehicleType: 'Sedan',
    fare: 900,
    seats: 4,
    totalSeats: 4,
    genderPref: 'Any',
    preBooked: false,
    driverName: '',
    driverPhone: '',
    vehicleNumber: '',
    vehicleColor: '',
    additionalNotes: 'Landing at 9:30 PM. Will book cab after landing.',
    status: 'Open',
    passengers: [],
  },
  {
    id: 5,
    creator: 'Arjun Nair',
    creatorEmail: 'arjun@vitstudent.ac.in',
    creatorPhone: '+91 96666 55555',
    pickup: 'VIT Chennai',
    drop: 'Guindy',
    date: '2026-09-25',
    time: '16:30',
    cabApp: 'Ola',
    vehicleType: 'Hatchback',
    fare: 450,
    seats: 2,
    totalSeats: 3,
    genderPref: 'Male Only',
    preBooked: true,
    driverName: 'Manikandan',
    driverPhone: '+91 81111 22222',
    vehicleNumber: 'TN 22 XY 9999',
    vehicleColor: 'Silver',
    additionalNotes: 'Going to IIT Madras area for a hackathon.',
    status: 'Open',
    passengers: [
      { name: 'Vikram Das', status: 'Confirmed' },
    ],
  },
];

/** List of common campus/city locations for dropdowns */
export const locations = [
  'VIT Chennai',
  'Chennai Airport',
  'Chennai Central',
  'Tambaram Station',
  'Guindy',
  'T. Nagar',
  'Velachery',
  'Chromepet',
  'Mahabalipuram',
  'Sholinganallur',
  'OMR (IT Corridor)',
  'Egmore',
];

/** Cab app options */
export const cabApps = ['Uber', 'Ola', 'Rapido', 'Other'];

/** Vehicle type options */
export const vehicleTypes = ['Sedan', 'SUV', 'Hatchback', 'Auto', 'Bike'];

/** Gender preference options */
export const genderPreferences = ['Any', 'Male Only', 'Female Only'];
