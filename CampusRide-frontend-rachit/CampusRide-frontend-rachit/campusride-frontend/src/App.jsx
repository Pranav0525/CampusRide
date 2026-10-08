import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CreateRidePage from './pages/CreateRidePage';
import SearchRidesPage from './pages/SearchRidesPage';
import RideDetailsPage from './pages/RideDetailsPage';
import Navbar from './components/Navbar';
import RideCard from './components/RideCard';
import { getStoredUser, getUserRides, getUserBookings } from './services/api';
import { Car, CalendarCheck, ArrowLeft } from 'lucide-react';

/**
 * App — Root component with warm cream/amber theme.
 */
function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/40 via-blue-50/20 to-white">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

function MyRidesView() {
  const currentUser = getStoredUser();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(Boolean(currentUser?.userId));

  useEffect(() => {
    if (!currentUser?.userId) return;
    getUserRides(currentUser.userId)
      .then((data) => setRides(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [currentUser?.userId]);

  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-8 space-y-6">
      <Link to="/dashboard" className="inline-flex items-center text-sky-600 hover:text-sky-700 font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Link>
      <div className="flex items-center gap-3">
        <Car className="w-7 h-7 text-sky-600" />
        <h1 className="text-3xl font-bold text-gray-800">My Rides</h1>
      </div>
      {loading ? (
        <p className="text-gray-500">Loading your rides...</p>
      ) : rides.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-sky-100">
          <p className="text-gray-500 mb-4">You haven't created or joined any rides yet.</p>
          <Link to="/create" className="text-sky-600 font-semibold hover:underline">
            Create a Ride
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rides.map((ride) => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </div>
      )}
    </div>
  );
}

function MyBookingsView() {
  const currentUser = getStoredUser();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(Boolean(currentUser?.userId));

  useEffect(() => {
    if (!currentUser?.userId) return;
    getUserBookings(currentUser.userId)
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [currentUser?.userId]);

  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-8 space-y-6">
      <Link to="/dashboard" className="inline-flex items-center text-sky-600 hover:text-sky-700 font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Link>
      <div className="flex items-center gap-3">
        <CalendarCheck className="w-7 h-7 text-sky-600" />
        <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
      </div>
      {loading ? (
        <p className="text-gray-500">Loading your bookings...</p>
      ) : bookings.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-sky-100">
          <p className="text-gray-500 mb-4">You don't have any booking requests yet.</p>
          <Link to="/search" className="text-sky-600 font-semibold hover:underline">
            Search Rides
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b.bookingId} className="bg-white rounded-2xl p-5 shadow-sm border border-sky-100 flex items-center justify-between">
              <div>
                <div className="font-bold text-gray-800">
                  {b.ride?.pickupLocation?.locationName || 'Pickup'} → {b.ride?.dropLocation?.locationName || 'Destination'}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Requested at: {b.requestedAt ? String(b.requestedAt).replace('T', ' ').slice(0, 16) : 'N/A'}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  b.status === 'Accepted'
                    ? 'bg-green-50 text-green-600 border-green-200'
                    : b.status === 'Rejected'
                    ? 'bg-red-50 text-red-500 border-red-200'
                    : 'bg-sky-50 text-sky-600 border-sky-200'
                }`}>
                  {b.status}
                </span>
                {b.ride?.rideId && (
                  <Link to={`/ride/${b.ride.rideId}`} className="text-sm font-medium text-sky-600 hover:underline">
                    View Ride
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<AppLayout><DashboardPage /></AppLayout>} />
        <Route path="/create" element={<AppLayout><CreateRidePage /></AppLayout>} />
        <Route path="/search" element={<AppLayout><SearchRidesPage /></AppLayout>} />
        <Route path="/ride/:id" element={<AppLayout><RideDetailsPage /></AppLayout>} />
        <Route path="/rides/:id" element={<AppLayout><RideDetailsPage /></AppLayout>} />

        {/* Connected User Views */}
        <Route path="/my-rides" element={<AppLayout><MyRidesView /></AppLayout>} />
        <Route path="/my-bookings" element={<AppLayout><MyBookingsView /></AppLayout>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
