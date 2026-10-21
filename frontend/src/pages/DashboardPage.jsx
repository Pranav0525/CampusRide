import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, PlusCircle, Car, CalendarCheck, MapPin, Clock, ArrowRight, XCircle } from 'lucide-react';
import { getStoredUser, getUserRides, getUserBookings } from '../services/api';

const DashboardPage = () => {
  const currentUser = getStoredUser();
  const [userRides, setUserRides] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(Boolean(currentUser?.userId));

  useEffect(() => {
    if (!currentUser?.userId) return;

    Promise.all([
      getUserRides(currentUser.userId).catch(() => []),
      getUserBookings(currentUser.userId).catch(() => []),
    ]).then(([rides, bookings]) => {
      setUserRides(Array.isArray(rides) ? rides : []);
      setUserBookings(Array.isArray(bookings) ? bookings : []);
      setLoading(false);
    });
  }, [currentUser?.userId]);

  const createdCount = userRides.filter(
    (r) => r.creatorId === currentUser?.userId || r.creatorEmail === currentUser?.email
  ).length;
  const joinedCount = userRides.length - createdCount;
  const now = new Date();
  const upcomingCount = userRides.filter((r) => {
    if (r.status === 'Cancelled') return false;
    return r.startDateTime ? new Date(r.startDateTime) >= now : true;
  }).length;

  const firstName = currentUser?.name ? currentUser.name.split(' ')[0] : 'Student';

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/40 via-blue-50/20 to-white pb-12">
      <div className="max-w-6xl mx-auto px-6 pt-8 space-y-8">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-sky-400 via-blue-400 to-sky-300 rounded-2xl p-8 text-white shadow-lg shadow-sky-100">
          <div className="md:flex justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {firstName}! 👋</h1>
              <p className="text-sky-100 text-lg">Ready for your next campus ride?</p>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4 text-center min-w-28 flex-shrink-0">
                <div className="text-3xl font-bold mb-1">{createdCount}</div>
                <div className="text-sm text-blue-50">Rides Created</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4 text-center min-w-28 flex-shrink-0">
                <div className="text-3xl font-bold mb-1">{joinedCount}</div>
                <div className="text-sm text-blue-50">Rides Joined</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4 text-center min-w-28 flex-shrink-0">
                <div className="text-3xl font-bold mb-1">{upcomingCount}</div>
                <div className="text-sm text-blue-50">Upcoming</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 px-1">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/search" className="group bg-white rounded-2xl p-6 shadow-sm border border-sky-100 hover:shadow-md hover:border-sky-200 hover:-translate-y-1 transition-all duration-300 block">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-sky-100 to-blue-100 p-3 rounded-xl text-sky-600 flex-shrink-0">
                  <Search size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-sky-600 transition-colors">Search Rides</h3>
                  <p className="text-gray-500 text-sm mt-1">Find available rides to your destination</p>
                </div>
              </div>
            </Link>

            <Link to="/create" className="group bg-white rounded-2xl p-6 shadow-sm border border-sky-100 hover:shadow-md hover:border-sky-200 hover:-translate-y-1 transition-all duration-300 block">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-sky-100 to-blue-100 p-3 rounded-xl text-sky-600 flex-shrink-0">
                  <PlusCircle size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-sky-600 transition-colors">Create Ride</h3>
                  <p className="text-gray-500 text-sm mt-1">Offer a shared cab ride to fellow students</p>
                </div>
              </div>
            </Link>

            <Link to="/my-rides" className="group bg-white rounded-2xl p-6 shadow-sm border border-sky-100 hover:shadow-md hover:border-sky-200 hover:-translate-y-1 transition-all duration-300 block">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-sky-100 to-blue-100 p-3 rounded-xl text-sky-600 flex-shrink-0">
                  <Car size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-sky-600 transition-colors">My Rides</h3>
                  <p className="text-gray-500 text-sm mt-1">View rides you created or joined</p>
                </div>
              </div>
            </Link>

            <Link to="/my-bookings" className="group bg-white rounded-2xl p-6 shadow-sm border border-sky-100 hover:shadow-md hover:border-sky-200 hover:-translate-y-1 transition-all duration-300 block">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-sky-100 to-blue-100 p-3 rounded-xl text-sky-600 flex-shrink-0">
                  <CalendarCheck size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-sky-600 transition-colors">My Bookings</h3>
                  <p className="text-gray-500 text-sm mt-1">Check booking status and history</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <Link to="/my-rides" className="text-sky-600 hover:text-sky-700 font-medium text-sm flex items-center">
              View all <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-sky-100 overflow-hidden">
            {loading ? (
              <div className="p-6 text-center text-gray-400 text-sm">Loading activity...</div>
            ) : userRides.length === 0 && userBookings.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">
                No recent ride activity yet. <Link to="/search" className="text-sky-600 font-medium hover:underline">Search for a ride</Link> or <Link to="/create" className="text-sky-600 font-medium hover:underline">create one</Link>!
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {userRides.slice(0, 5).map((ride) => {
                  const isCreator = ride.creatorId === currentUser?.userId || ride.creatorEmail === currentUser?.email;
                  const isCancelled = ride.status === 'Cancelled';
                  return (
                    <Link
                      key={`ride-${ride.id}`}
                      to={`/ride/${ride.id}`}
                      className="p-4 sm:p-6 hover:bg-sky-50/30 transition-colors flex items-center justify-between gap-4 block"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`${isCancelled ? 'bg-red-100 text-red-500' : isCreator ? 'bg-green-100 text-green-600' : 'bg-sky-100 text-sky-600'} p-2.5 rounded-full hidden sm:block`}>
                          {isCancelled ? <XCircle size={20} /> : isCreator ? <PlusCircle size={20} /> : <Car size={20} />}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {isCreator ? `Created ride to ${ride.drop}` : `Joined ride to ${ride.drop}`}
                          </h4>
                          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1"><MapPin size={14} /> {ride.pickup}</span>
                            <span className="flex items-center gap-1"><Clock size={14} /> {ride.date} {ride.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                          isCancelled
                            ? 'bg-red-50 text-red-500 border-red-100'
                            : 'bg-green-50 text-green-600 border-green-100'
                        }`}>
                          {ride.status}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
