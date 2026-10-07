import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CreateRidePage from './pages/CreateRidePage';
import SearchRidesPage from './pages/SearchRidesPage';
import RideDetailsPage from './pages/RideDetailsPage';
import Navbar from './components/Navbar';
import { Construction } from 'lucide-react';

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

function ComingSoon({ title, description }) {
  return (
    <div className="max-w-4xl mx-auto p-8 text-center py-24">
      <div className="bg-gradient-to-br from-sky-100 to-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <Construction className="w-8 h-8 text-sky-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-400">{description}</p>
      <p className="text-sm text-sky-600 mt-4">Check back after backend integration ☀️</p>
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

        {/* Placeholders */}
        <Route path="/my-rides" element={<AppLayout><ComingSoon title="My Rides" description="View and manage rides you've created or joined" /></AppLayout>} />
        <Route path="/my-bookings" element={<AppLayout><ComingSoon title="My Bookings" description="Track your booking status and ride history" /></AppLayout>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
