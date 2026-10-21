import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CreateRidePage from './pages/CreateRidePage';
import SearchRidesPage from './pages/SearchRidesPage';
import RideDetailsPage from './pages/RideDetailsPage';
import MyRidesPage from './pages/MyRidesPage';
import MyBookingsPage from './pages/MyBookingsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import Navbar from './components/Navbar';

/**
 * App — Root component with responsive layout and full navigation routes.
 */
function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/40 via-blue-50/20 to-white">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public authentication routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected application routes */}
        <Route path="/dashboard" element={<AppLayout><DashboardPage /></AppLayout>} />
        <Route path="/create" element={<AppLayout><CreateRidePage /></AppLayout>} />
        <Route path="/search" element={<AppLayout><SearchRidesPage /></AppLayout>} />
        <Route path="/ride/:id" element={<AppLayout><RideDetailsPage /></AppLayout>} />
        <Route path="/rides/:id" element={<AppLayout><RideDetailsPage /></AppLayout>} />

        {/* User Activity & Ride Management Views */}
        <Route path="/my-rides" element={<AppLayout><MyRidesPage /></AppLayout>} />
        <Route path="/my-bookings" element={<AppLayout><MyBookingsPage /></AppLayout>} />

        {/* DBMS Evaluation & Platform Analytics */}
        <Route path="/admin" element={<AppLayout><AdminDashboardPage /></AppLayout>} />
        <Route path="/analytics" element={<AppLayout><AdminDashboardPage /></AppLayout>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
