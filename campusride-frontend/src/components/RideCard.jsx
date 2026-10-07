import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Car, Users, ArrowRight } from 'lucide-react';

/**
 * RideCard — Warm cream/amber themed ride card.
 * Shows cancelled rides with visual strikethrough effect.
 */
export default function RideCard({ ride }) {
  const isCancelled = ride.status === 'Cancelled';

  const statusStyles = {
    Open: 'bg-green-50 text-green-600 border border-green-200',
    Full: 'bg-red-50 text-red-500 border border-red-200',
    Completed: 'bg-gray-50 text-gray-500 border border-gray-200',
    Cancelled: 'bg-red-50 text-red-500 border border-red-200',
  };

  const cabAppStyles = {
    Uber: 'bg-gray-900 text-white',
    Ola: 'bg-green-500 text-white',
    Rapido: 'bg-sky-400 text-gray-900',
    Other: 'bg-gray-400 text-white',
  };

  return (
    <div className={`bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 border border-sky-100 hover:border-sky-200 overflow-hidden ${isCancelled ? 'opacity-60' : ''}`}>
      <div className="p-5">
        {/* Route */}
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
          <span className={`font-semibold text-gray-800 ${isCancelled ? 'line-through' : ''}`}>{ride.pickup}</span>
          <ArrowRight className="w-4 h-4 text-gray-300 shrink-0" />
          <MapPin className="w-4 h-4 text-blue-300 shrink-0" />
          <span className={`font-semibold text-gray-800 ${isCancelled ? 'line-through' : ''}`}>{ride.drop}</span>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {ride.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {ride.time}
          </span>
          <span className="flex items-center gap-1">
            <Car className="w-3.5 h-3.5" />
            {ride.vehicleType}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {ride.seats} seat{ride.seats !== 1 ? 's' : ''} left
          </span>
        </div>

        {/* Badges + Fare */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${cabAppStyles[ride.cabApp] || cabAppStyles.Other}`}>
              {ride.cabApp}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[ride.status] || statusStyles.Open}`}>
              {ride.status}
            </span>
            {ride.genderPref !== 'Any' && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-500 border border-blue-200">
                {ride.genderPref}
              </span>
            )}
          </div>
          <span className={`text-lg font-bold ${isCancelled ? 'text-gray-400 line-through' : 'text-sky-600'}`}>₹{ride.fare}</span>
        </div>

        {/* Creator + CTA */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-sky-50">
          <span className="text-sm text-gray-400">by {ride.creator}</span>
          {isCancelled ? (
            <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-gray-100 text-gray-400 text-sm font-medium rounded-lg cursor-not-allowed">
              Cancelled
            </span>
          ) : (
            <Link
              to={`/ride/${ride.id}`}
              className="inline-flex items-center gap-1 px-4 py-1.5 bg-gradient-to-r from-sky-400 to-blue-400 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-medium rounded-lg shadow-sm shadow-sky-100 transition-all"
            >
              View Details
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
