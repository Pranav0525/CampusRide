import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Car, PlusCircle, Calendar, Clock, MapPin, Users, ArrowRight, ShieldCheck, XCircle } from 'lucide-react';
import { getStoredUser, getUserRides, cancelRide } from '../services/api';

const MyRidesPage = () => {
  const currentUser = getStoredUser();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('created'); // 'created' | 'joined'
  const [actionMessage, setActionMessage] = useState('');
  const [cancellingId, setCancellingId] = useState(null);

  const fetchRides = async () => {
    if (!currentUser?.userId) {
      setLoading(false);
      return;
    }
    try {
      const data = await getUserRides(currentUser.userId);
      setRides(Array.isArray(data) ? data : []);
    } catch {
      // keep empty
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRides();
  }, [currentUser?.userId]);

  const handleCancel = async (rideId) => {
    if (!confirm('Are you sure you want to cancel this ride?')) return;
    setCancellingId(rideId);
    try {
      await cancelRide(rideId, currentUser.userId);
      setActionMessage('Ride cancelled successfully.');
      await fetchRides();
    } catch (err) {
      alert(err.message || 'Failed to cancel ride');
    } finally {
      setCancellingId(null);
    }
  };

  const createdRides = rides.filter(
    (r) => r.creatorId === currentUser?.userId || r.creatorEmail === currentUser?.email
  );
  const joinedRides = rides.filter(
    (r) => r.creatorId !== currentUser?.userId && r.creatorEmail !== currentUser?.email
  );

  const currentList = activeTab === 'created' ? createdRides : joinedRides;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/40 via-blue-50/20 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Car className="w-8 h-8 text-sky-600" /> My Rides
            </h1>
            <p className="text-gray-500 mt-1">Manage rides you've created or joined</p>
          </div>
          <Link
            to="/create"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-400 to-blue-400 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-md shadow-sky-100 transition-all text-sm"
          >
            <PlusCircle size={18} /> Create New Ride
          </Link>
        </div>

        {actionMessage && (
          <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
            {actionMessage}
          </div>
        )}

        {/* Tab Controls */}
        <div className="flex border-b border-gray-200 gap-4">
          <button
            onClick={() => setActiveTab('created')}
            className={`pb-3 font-semibold text-sm transition-colors border-b-2 cursor-pointer ${
              activeTab === 'created'
                ? 'border-sky-500 text-sky-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Created by Me ({createdRides.length})
          </button>
          <button
            onClick={() => setActiveTab('joined')}
            className={`pb-3 font-semibold text-sm transition-colors border-b-2 cursor-pointer ${
              activeTab === 'joined'
                ? 'border-sky-500 text-sky-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Joined as Passenger ({joinedRides.length})
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm">Loading your rides...</div>
        ) : currentList.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-sky-100 shadow-sm space-y-4">
            <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center mx-auto text-sky-600">
              <Car size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              {activeTab === 'created' ? 'No rides created yet' : 'No joined rides yet'}
            </h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              {activeTab === 'created'
                ? 'Offer a cab share to your fellow classmates and split the travel fare!'
                : 'Search available campus cabs and request to join a ride.'}
            </p>
            <Link
              to={activeTab === 'created' ? '/create' : '/search'}
              className="inline-block text-sky-600 font-semibold hover:underline text-sm"
            >
              {activeTab === 'created' ? 'Create a Ride' : 'Search Rides'}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {currentList.map((ride) => {
              const isCancelled = ride.status === 'Cancelled';
              const isCreator = ride.creatorId === currentUser?.userId || ride.creatorEmail === currentUser?.email;

              return (
                <div
                  key={ride.id}
                  className={`bg-white rounded-2xl p-6 shadow-sm border border-sky-100 hover:shadow-md transition-all duration-200 ${
                    isCancelled ? 'opacity-70 bg-gray-50/50' : ''
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2.5 flex-1">
                      {/* Route */}
                      <div className="flex items-center gap-2 text-lg font-bold text-gray-800">
                        <MapPin className="w-5 h-5 text-sky-600 shrink-0" />
                        <span className={isCancelled ? 'line-through' : ''}>{ride.pickup}</span>
                        <ArrowRight className="w-4 h-4 text-gray-300 shrink-0" />
                        <MapPin className="w-5 h-5 text-blue-400 shrink-0" />
                        <span className={isCancelled ? 'line-through' : ''}>{ride.drop}</span>
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {ride.date}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {ride.time}</span>
                        <span className="flex items-center gap-1.5"><Car className="w-4 h-4" /> {ride.cabApp} ({ride.vehicleType})</span>
                        <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {ride.seats} seats remaining</span>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                          isCancelled
                            ? 'bg-red-50 text-red-500 border-red-200'
                            : ride.status === 'Full'
                            ? 'bg-amber-50 text-amber-600 border-amber-200'
                            : 'bg-green-50 text-green-600 border-green-200'
                        }`}>
                          {ride.status}
                        </span>
                        {ride.preBooked && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" /> Pre-booked Cab
                          </span>
                        )}
                        <span className="text-xs text-gray-400">
                          {isCreator ? 'Created by you' : `Hosted by ${ride.creator}`}
                        </span>
                      </div>
                    </div>

                    {/* Right Action */}
                    <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 gap-3">
                      <div className="text-2xl font-bold text-sky-600">₹{ride.fare}</div>
                      <div className="flex items-center gap-2">
                        {isCreator && !isCancelled && (
                          <button
                            onClick={() => handleCancel(ride.id)}
                            disabled={cancellingId === ride.id}
                            className="px-3 py-1.5 text-xs font-semibold text-red-600 border border-red-200 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            {cancellingId === ride.id ? 'Cancelling...' : 'Cancel'}
                          </button>
                        )}
                        <Link
                          to={`/ride/${ride.id}`}
                          className="px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-400 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-semibold rounded-lg shadow-sm shadow-sky-100 transition-all flex items-center gap-1"
                        >
                          View Details <ArrowRight size={14} />
                        </Link>
                      </div>
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

export default MyRidesPage;
