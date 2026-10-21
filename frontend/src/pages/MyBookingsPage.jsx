import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, Calendar, Clock, MapPin, ArrowRight, CheckCircle2, Clock3, XCircle } from 'lucide-react';
import { getStoredUser, getUserBookings } from '../services/api';

const MyBookingsPage = () => {
  const currentUser = getStoredUser();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'Pending' | 'Accepted' | 'Rejected'

  useEffect(() => {
    if (!currentUser?.userId) {
      setLoading(false);
      return;
    }
    getUserBookings(currentUser.userId)
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [currentUser?.userId]);

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'ALL') return true;
    return b.status === filter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
            <CheckCircle2 size={14} /> Accepted
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-200">
            <XCircle size={14} /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
            <Clock3 size={14} /> Pending Approval
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/40 via-blue-50/20 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <CalendarCheck className="w-8 h-8 text-sky-600" /> My Bookings
            </h1>
            <p className="text-gray-500 mt-1">Track status of your ride join requests</p>
          </div>
          <Link
            to="/search"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-400 to-blue-400 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-md shadow-sky-100 transition-all text-sm"
          >
            Find More Rides
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {['ALL', 'Pending', 'Accepted', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filter === status
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-sky-300'
              }`}
            >
              {status === 'ALL' ? 'All Requests' : status} ({
                status === 'ALL'
                  ? bookings.length
                  : bookings.filter((b) => b.status === status).length
              })
            </button>
          ))}
        </div>

        {/* List Content */}
        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm">Loading your bookings...</div>
        ) : filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-sky-100 shadow-sm space-y-4">
            <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center mx-auto text-sky-600">
              <CalendarCheck size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">No booking requests found</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              You haven't requested to join any rides matching this status yet.
            </p>
            <Link
              to="/search"
              className="inline-block text-sky-600 font-semibold hover:underline text-sm"
            >
              Search Available Rides
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((b) => {
              const ride = b.ride;
              const pickup = ride?.pickupLocation?.locationName || 'Pickup';
              const drop = ride?.dropLocation?.locationName || 'Destination';
              const startDateTime = ride?.startDateTime
                ? String(ride.startDateTime).replace('T', ' ').slice(0, 16)
                : 'Schedule TBA';

              return (
                <div
                  key={b.bookingId}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-sky-100 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2.5 flex-1">
                      
                      {/* Route */}
                      <div className="flex items-center gap-2 text-lg font-bold text-gray-800">
                        <MapPin className="w-5 h-5 text-sky-600 shrink-0" />
                        <span>{pickup}</span>
                        <ArrowRight className="w-4 h-4 text-gray-300 shrink-0" />
                        <MapPin className="w-5 h-5 text-blue-400 shrink-0" />
                        <span>{drop}</span>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" /> {startDateTime}
                        </span>
                        {ride?.cabProvider && (
                          <span className="flex items-center gap-1.5">
                            {ride.cabProvider} • {ride.cabType || 'Cab'}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" /> Requested on: {b.requestedAt ? String(b.requestedAt).replace('T', ' ').slice(0, 16) : 'N/A'}
                        </span>
                      </div>

                      {/* Status + Info */}
                      <div className="flex items-center gap-3 pt-1">
                        {getStatusBadge(b.status)}
                        {b.status === 'Accepted' && (
                          <span className="text-xs text-green-700 font-medium">
                            Seat confirmed! Coordinate with ride creator.
                          </span>
                        )}
                        {b.status === 'Pending' && (
                          <span className="text-xs text-gray-500">
                            Waiting for the creator to accept your request.
                          </span>
                        )}
                        {b.status === 'Rejected' && (
                          <span className="text-xs text-red-500">
                            Creator was unable to accept this request.
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right Fare & View Button */}
                    <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 gap-3">
                      {ride?.estimatedFare && (
                        <div className="text-xl font-bold text-sky-600">
                          ₹{ride.estimatedFare} <span className="text-xs font-normal text-gray-400">total</span>
                        </div>
                      )}
                      {ride?.rideId && (
                        <Link
                          to={`/ride/${ride.rideId}`}
                          className="px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-400 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-semibold rounded-lg shadow-sm shadow-sky-100 transition-all flex items-center gap-1"
                        >
                          View Ride <ArrowRight size={14} />
                        </Link>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyBookingsPage;
