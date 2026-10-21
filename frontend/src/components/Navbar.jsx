import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Car, Search, PlusCircle, User, LogOut, Menu, X, CalendarCheck, BarChart3 } from 'lucide-react';
import { useState } from 'react';
import { getStoredUser, clearStoredUser } from '../services/api';

/**
 * Navbar — CampusRide navigation bar with quick links and student status.
 */
export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentUser = getStoredUser();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    clearStoredUser();
    navigate('/login');
  };

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: User },
    { to: '/search', label: 'Search', icon: Search },
    { to: '/create', label: 'Create Ride', icon: PlusCircle },
    { to: '/my-rides', label: 'My Rides', icon: Car },
    { to: '/my-bookings', label: 'Bookings', icon: CalendarCheck },
    { to: '/admin', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <nav className="bg-sky-50/80 backdrop-blur-md border-b border-sky-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="bg-gradient-to-br from-sky-400 to-blue-400 p-2 rounded-xl shadow-sm shadow-sky-100 group-hover:shadow-md group-hover:shadow-sky-200 transition-all">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
              CampusRide
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive(to)
                    ? 'bg-gradient-to-r from-sky-400 to-blue-400 text-white shadow-sm shadow-sky-100'
                    : 'text-gray-600 hover:text-sky-700 hover:bg-sky-100/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <>
                <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-white rounded-xl border border-sky-100 shadow-xs text-xs">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 text-white flex items-center justify-center font-bold text-[10px]">
                    {currentUser.name ? currentUser.name.charAt(0) : 'S'}
                  </div>
                  <span className="font-semibold text-gray-700">{currentUser.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-1.5 bg-gradient-to-r from-sky-400 to-blue-400 text-white rounded-xl text-xs font-semibold shadow-sm hover:from-amber-600 hover:to-orange-600 transition-all"
              >
                Sign In
              </Link>
            )}

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-sky-100 text-gray-500"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 pt-2 border-t border-sky-100 space-y-1 animate-in slide-in-from-top-2">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive(to)
                    ? 'bg-gradient-to-r from-sky-400 to-blue-400 text-white'
                    : 'text-gray-600 hover:bg-sky-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
