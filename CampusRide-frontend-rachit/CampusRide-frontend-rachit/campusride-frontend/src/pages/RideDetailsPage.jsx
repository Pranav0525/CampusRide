import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Car, Users, Phone, Mail, IndianRupee, ArrowLeft, CheckCircle, Shield, XCircle, AlertTriangle, Star } from 'lucide-react';
import {
  getRideById,
  getRideMembers,
  getRideBookings,
  joinRide,
  acceptBooking,
  rejectBooking,
  cancelRide,
  rateRide,
  getStoredUser,
} from '../services/api';

const RideDetailsPage = () => {
  const { id } = useParams();
  const currentUser = getStoredUser();

  const [rideData, setRideData] = useState(null);
  const [members, setMembers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Rating state
  const [ratingValue, setRatingValue] = useState(5);
  const [ratingComment, setRatingComment] = useState('');
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  const loadRideDetails = useCallback(async () => {
    try {
      const [ride, memberList, bookingList] = await Promise.all([
        getRideById(id),
        getRideMembers(id).catch(() => []),
        getRideBookings(id).catch(() => []),
      ]);
      setRideData(ride);
      setMembers(Array.isArray(memberList) ? memberList : []);
      setBookings(Array.isArray(bookingList) ? bookingList : []);
    } catch (err) {
      setError(err.message || 'Failed to load ride details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    let active = true;
    Promise.all([
      getRideById(id),
      getRideMembers(id).catch(() => []),
      getRideBookings(id).catch(() => []),
    ])
      .then(([ride, memberList, bookingList]) => {
        if (!active) return;
        setRideData(ride);
        setMembers(Array.isArray(memberList) ? memberList : []);
        setBookings(Array.isArray(bookingList) ? bookingList : []);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message || 'Failed to load ride details');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  const handleJoinRequest = async () => {
    if (!currentUser?.userId) {
      setError('Please log in to request joining a ride');
      return;
    }
    setActionLoading(true);
    setError('');
    setActionMessage('');
    try {
      await joinRide(Number(id), currentUser.userId);
      setActionMessage('Booking request sent! Waiting for creator approval.');
      await loadRideDetails();
    } catch (err) {
      setError(err.message || 'Could not request to join ride');
    } finally {
      setActionLoading(false);
    }
  };

  const handleBookingDecision = async (bookingId, accept) => {
    if (!currentUser?.userId) return;
    setActionLoading(true);
    setError('');
    setActionMessage('');
    try {
      if (accept) {
        await acceptBooking(bookingId, currentUser.userId);
        setActionMessage('Booking accepted!');
      } else {
        await rejectBooking(bookingId, currentUser.userId);
        setActionMessage('Booking rejected.');
      }
      await loadRideDetails();
    } catch (err) {
      setError(err.message || 'Failed to update booking');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancel = async () => {
    setActionLoading(true);
    setError('');
    try {
      const updated = await cancelRide(Number(id), currentUser?.userId);
      setRideData(updated);
      setShowCancelModal(false);
      setActionMessage('Ride cancelled.');
    } catch (err) {
      setError(err.message || 'Failed to cancel ride');
      setShowCancelModal(false);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRateSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser?.userId) return;
    setActionLoading(true);
    setError('');
    try {
      await rateRide(Number(id), {
        userId: currentUser.userId,
        ratingValue: Number(ratingValue),
        comment: ratingComment.trim() || null,
      });
      setRatingSubmitted(true);
      setActionMessage('Thank you for rating this ride!');
    } catch (err) {
      setError(err.message || 'Failed to submit rating');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50/40 via-blue-50/20 to-white">
        <div className="text-sky-600 font-semibold text-lg">Loading ride details...</div>
      </div>
    );
  }

  if (!rideData) {
    return (
      <div className="min-h-screen py-12 px-4 max-w-3xl mx-auto text-center">
        <p className="text-red-500 font-medium mb-4">{error || 'Ride not found'}</p>
        <Link to="/search" className="text-sky-600 hover:underline font-medium">
          Back to Search
        </Link>
      </div>
    );
  }

  const isCancelled = rideData.status === 'Cancelled';
  const isCreator = currentUser?.userId && (rideData.creatorId === currentUser.userId || rideData.creatorEmail === currentUser.email);
  const isConfirmedMember = members.some((m) => m.user?.userId === currentUser?.userId);
  const myBooking = bookings.find((b) => b.user?.userId === currentUser?.userId);
  const pendingBookings = bookings.filter((b) => b.status === 'Pending');

  // Build passenger list from confirmed RideMembers
  const passengers = members.map((m) => ({
    id: m.rideMemberId,
    name: m.user?.name || 'Student',
    status: m.memberStatus === 'Creator' ? 'Creator' : 'Confirmed',
  }));

  const passengerCount = Math.max(passengers.length, 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/40 via-blue-50/20 to-white py-8 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <Link to="/search" className="inline-flex items-center text-sky-600 hover:text-sky-700 font-medium mb-2">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Search
        </Link>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
            {error}
          </div>
        )}

        {actionMessage && (
          <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            {actionMessage}
          </div>
        )}

        {/* Route Hero */}
        <div className={`bg-gradient-to-r from-sky-400 via-blue-400 to-sky-300 rounded-2xl p-8 text-white shadow-lg shadow-sky-100 transition-all ${isCancelled ? 'opacity-75' : ''}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                {rideData.status}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold flex items-center flex-wrap gap-3">
                <span>{rideData.pickup}</span>
                <span className="text-sky-100">→</span>
                <span>{rideData.drop}</span>
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-sky-100 font-medium">
                <div className="flex items-center gap-2"><Calendar className="w-5 h-5" /> {rideData.date}</div>
                <div className="flex items-center gap-2"><Clock className="w-5 h-5" /> {rideData.time}</div>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-center min-w-[140px]">
              <div className="text-sm text-sky-100 mb-1">Total Fare</div>
              <div className="text-3xl font-bold text-white">₹{rideData.fare}</div>
            </div>
          </div>
        </div>

        {isCancelled && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 flex items-start gap-3">
            <XCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold">This ride has been cancelled</h3>
              <p className="text-sm mt-1">Reason: Ride creator cancelled this ride</p>
              <p className="text-sm mt-0.5">All passengers have been notified</p>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column */}
          <div className="w-full md:w-2/3 space-y-6">
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-sky-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Car className="w-5 h-5 text-sky-600" /> Ride Information
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div>
                  <div className="text-gray-500 text-sm mb-1">Cab App</div>
                  <div className="font-semibold text-gray-800">{rideData.cabApp || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm mb-1">Vehicle Type</div>
                  <div className="font-semibold text-gray-800">{rideData.vehicleType || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm mb-1">Seats Left</div>
                  <div className="font-semibold text-gray-800">{rideData.seats} / {rideData.totalSeats}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm mb-1">Gender Pref.</div>
                  <div className="font-semibold text-gray-800">{rideData.genderPref}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm mb-1">Pre-booked</div>
                  <div className="font-semibold text-gray-800">{rideData.preBooked ? 'Yes' : 'No'}</div>
                </div>
              </div>
            </div>

            {rideData.additionalNotes && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-sky-100">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Additional Notes</h3>
                <p className="text-gray-600 bg-sky-50 rounded-xl p-4">{rideData.additionalNotes}</p>
              </div>
            )}

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-sky-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-sky-600" /> Ride Members ({passengers.length})
              </h3>
              <div className="space-y-3">
                {passengers.map((p, idx) => (
                  <div key={p.id || idx} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-sky-50/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-700 font-bold">
                        {p.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-800">{p.name}</span>
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-600 border border-green-200">
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Creator Booking Requests Management */}
            {isCreator && pendingBookings.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-600" /> Pending Join Requests ({pendingBookings.length})
                </h3>
                <div className="space-y-3">
                  {pendingBookings.map((b) => (
                    <div key={b.bookingId} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-gray-100 bg-amber-50/30">
                      <div>
                        <div className="font-semibold text-gray-800">{b.user?.name || `User #${b.user?.userId}`}</div>
                        <div className="text-xs text-gray-500">{b.user?.email} • {b.user?.phone}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleBookingDecision(b.bookingId, true)}
                          disabled={actionLoading}
                          className="px-3.5 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleBookingDecision(b.bookingId, false)}
                          disabled={actionLoading}
                          className="px-3.5 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-5 border border-sky-100">
              <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-2">
                <IndianRupee className="w-5 h-5 text-sky-600" /> Fare Split Estimate
              </h3>
              <p className="text-gray-600 text-sm">
                With current members ({passengerCount}), estimated cost per person is <span className="font-bold text-sky-700">₹{Math.round((rideData.fare || 0) / passengerCount)}</span>.
                If fully booked ({rideData.totalSeats}), it will be <span className="font-bold text-sky-700">₹{Math.round((rideData.fare || 0) / Math.max(rideData.totalSeats || 1, 1))}</span>.
              </p>
            </div>

            {/* Rate Ride Form for Confirmed Members */}
            {isConfirmedMember && !ratingSubmitted && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-sky-100">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" /> Rate this Ride
                </h3>
                <form onSubmit={handleRateSubmit} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-700">Rating (1 - 5):</label>
                    <select
                      value={ratingValue}
                      onChange={(e) => setRatingValue(e.target.value)}
                      className="rounded-xl border border-gray-200 py-1.5 px-3 text-sm outline-none focus:border-sky-400"
                    >
                      {[5, 4, 3, 2, 1].map((v) => (
                        <option key={v} value={v}>{v} Star{v > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    rows="2"
                    placeholder="Share your experience with this ride..."
                    value={ratingComment}
                    onChange={(e) => setRatingComment(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-sky-400"
                  />
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="px-5 py-2 bg-gradient-to-r from-sky-400 to-blue-400 text-white text-sm font-semibold rounded-xl shadow-sm hover:from-amber-600 hover:to-orange-600 transition-all cursor-pointer"
                  >
                    Submit Rating
                  </button>
                </form>
              </div>
            )}
            
          </div>

          {/* Right Column */}
          <div className="w-full md:w-1/3 space-y-6">
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-sky-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Created by</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-sm">
                  {(rideData.creator || 'U').charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gray-800">{rideData.creator}</div>
                  <div className="text-xs text-sky-600 flex items-center gap-1"><Shield className="w-3 h-3" /> Verified Student</div>
                </div>
              </div>
              <div className="space-y-3 pt-3 border-t border-gray-100">
                {rideData.creatorPhone && (
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <Phone className="w-4 h-4 text-sky-600" /> {rideData.creatorPhone}
                  </div>
                )}
                {rideData.creatorEmail && (
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <Mail className="w-4 h-4 text-sky-600" /> {rideData.creatorEmail}
                  </div>
                )}
              </div>
            </div>

            {(rideData.driverName || rideData.vehicleNumber) && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-sky-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Car className="w-5 h-5 text-sky-600" /> Driver & Vehicle
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  {rideData.driverName && <div><span className="font-medium text-gray-800">Driver:</span> {rideData.driverName}</div>}
                  {rideData.driverPhone && <div><span className="font-medium text-gray-800">Phone:</span> {rideData.driverPhone}</div>}
                  {rideData.vehicleNumber && <div><span className="font-medium text-gray-800">Plate:</span> <span className="bg-gray-100 px-2 py-0.5 rounded font-mono text-gray-800 border border-gray-200">{rideData.vehicleNumber}</span></div>}
                  {rideData.vehicleColor && <div><span className="font-medium text-gray-800">Color:</span> {rideData.vehicleColor}</div>}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-sm flex flex-col gap-3">
              {!isCancelled ? (
                <>
                  {!isCreator && !isConfirmedMember && !myBooking && rideData.seats > 0 && (
                    <button
                      onClick={handleJoinRequest}
                      disabled={actionLoading}
                      className="w-full bg-gradient-to-r from-sky-400 to-blue-400 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-sky-100 transition-all transform hover:-translate-y-0.5 text-lg disabled:opacity-60 cursor-pointer"
                    >
                      {actionLoading ? 'Submitting...' : 'Request to Join'}
                    </button>
                  )}

                  {myBooking && (
                    <div className="w-full py-3 px-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 font-semibold text-center text-sm">
                      Your Booking Status: {myBooking.status}
                    </div>
                  )}

                  {isConfirmedMember && !isCreator && (
                    <div className="w-full py-3 px-4 rounded-xl bg-green-50 border border-green-200 text-green-700 font-semibold text-center text-sm">
                      You are a confirmed member of this ride
                    </div>
                  )}

                  {isCreator && (
                    <button
                      onClick={() => setShowCancelModal(true)}
                      disabled={actionLoading}
                      className="w-full bg-white border-2 border-red-300 text-red-500 hover:bg-red-50 hover:border-red-400 font-semibold py-2.5 rounded-xl transition-colors mt-1 cursor-pointer"
                    >
                      Cancel Ride
                    </button>
                  )}
                </>
              ) : (
                <button disabled className="w-full bg-gray-100 text-gray-400 font-bold py-3.5 rounded-xl cursor-not-allowed text-lg">
                  Ride Cancelled
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-auto shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Cancel this ride?</h2>
            <p className="text-gray-500 text-center mb-6">
              This action cannot be undone. All passengers will be notified.
            </p>
            
            <div className="bg-red-50 rounded-xl p-4 mb-6">
              <h4 className="font-bold text-red-800 mb-2 text-sm">What happens when you cancel:</h4>
              <ul className="text-sm text-red-700 space-y-1.5">
                <li>• All {passengers.length} member(s) will be notified</li>
                <li>• Ride status will change to Cancelled</li>
                <li>• This ride will be removed from open search results</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => setShowCancelModal(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl px-6 py-3 transition-colors cursor-pointer">
                Keep Ride
              </button>
              <button onClick={handleCancel} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl px-6 py-3 transition-colors shadow-lg shadow-red-200 cursor-pointer">
                Yes, Cancel Ride
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RideDetailsPage;
