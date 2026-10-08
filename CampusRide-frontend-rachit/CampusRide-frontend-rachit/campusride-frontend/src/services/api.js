const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const USER_STORAGE_KEY = 'campusride_user';

/**
 * Helper to execute HTTP requests against the CampusRide Spring Boot backend.
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  };

  const response = await fetch(url, config);
  let data = null;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  }

  if (!response.ok) {
    const detailMsg = Array.isArray(data?.details) ? data.details.join(', ') : null;
    const message = detailMsg || data?.error || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
}

/**
 * Normalizes a backend RideResponse into the shape expected by frontend components.
 */
export function normalizeRide(ride) {
  if (!ride) return null;

  let date = ride.date || '';
  let time = ride.time || '';

  if (ride.startDateTime) {
    const [datePart, timePart] = String(ride.startDateTime).split('T');
    date = datePart || date;
    time = timePart ? timePart.slice(0, 5) : time;
  }

  return {
    ...ride,
    date,
    time,
    seats: ride.availableSeats ?? ride.seats ?? 0,
    availableSeats: ride.availableSeats ?? ride.seats ?? 0,
    genderPref: ride.genderPreference ?? ride.genderPref ?? 'Any',
    genderPreference: ride.genderPreference ?? ride.genderPref ?? 'Any',
    additionalNotes: ride.notes ?? ride.additionalNotes ?? '',
    notes: ride.notes ?? ride.additionalNotes ?? '',
    preBooked: Boolean(ride.preBooked),
  };
}

// ==========================================
// Local Auth Session Helpers
// ==========================================

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

export function clearStoredUser() {
  localStorage.removeItem(USER_STORAGE_KEY);
}

// ==========================================
// Health Check API
// ==========================================

export async function checkHealth() {
  return apiRequest('/health');
}

// ==========================================
// Auth API (/api/auth)
// ==========================================

export async function registerUser({ name, studentId, email, phone, gender, password }) {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, studentId, email, phone, gender, password }),
  });
}

export async function loginUser({ identifier, password }) {
  const user = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ identifier, password }),
  });
  setStoredUser(user);
  return user;
}

// ==========================================
// Locations API (/api/locations)
// ==========================================

export async function getLocations() {
  return apiRequest('/locations');
}

// ==========================================
// Rides API (/api/rides)
// ==========================================

export async function createRide(ridePayload) {
  const res = await apiRequest('/rides', {
    method: 'POST',
    body: JSON.stringify(ridePayload),
  });
  return normalizeRide(res);
}

export async function searchRides({ pickup, drop, from, to } = {}) {
  const params = new URLSearchParams();
  if (pickup) params.set('pickup', pickup);
  if (drop) params.set('drop', drop);
  if (from) params.set('from', from);
  if (to) params.set('to', to);

  const queryString = params.toString();
  const rides = await apiRequest(`/rides/search${queryString ? `?${queryString}` : ''}`);
  return Array.isArray(rides) ? rides.map(normalizeRide) : [];
}

export async function getRideById(rideId) {
  const res = await apiRequest(`/rides/${rideId}`);
  return normalizeRide(res);
}

export async function cancelRide(rideId, creatorId) {
  const res = await apiRequest(`/rides/${rideId}/cancel`, {
    method: 'PUT',
    body: JSON.stringify({ creatorId }),
  });
  return normalizeRide(res);
}

export async function joinRide(rideId, userId) {
  return apiRequest(`/rides/${rideId}/join`, {
    method: 'POST',
    body: JSON.stringify({ userId }),
  });
}

export async function getRideMembers(rideId) {
  return apiRequest(`/rides/${rideId}/members`);
}

export async function getRideBookings(rideId) {
  return apiRequest(`/rides/${rideId}/bookings`);
}

export async function rateRide(rideId, { userId, ratingValue, comment }) {
  return apiRequest(`/rides/${rideId}/rating`, {
    method: 'POST',
    body: JSON.stringify({ userId, ratingValue, comment }),
  });
}

// ==========================================
// Bookings API (/api/bookings)
// ==========================================

export async function acceptBooking(bookingId, creatorId) {
  return apiRequest(`/bookings/${bookingId}/accept`, {
    method: 'PUT',
    body: JSON.stringify({ creatorId }),
  });
}

export async function rejectBooking(bookingId, creatorId) {
  return apiRequest(`/bookings/${bookingId}/reject`, {
    method: 'PUT',
    body: JSON.stringify({ creatorId }),
  });
}

// ==========================================
// Users API (/api/users)
// ==========================================

export async function getUserById(userId) {
  return apiRequest(`/users/${userId}`);
}

export async function getUserBookings(userId) {
  return apiRequest(`/users/${userId}/bookings`);
}

export async function getUserRides(userId) {
  const rides = await apiRequest(`/users/${userId}/rides`);
  return Array.isArray(rides) ? rides.map(normalizeRide) : [];
}
