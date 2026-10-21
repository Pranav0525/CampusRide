import React, { useState, useEffect, useCallback } from 'react';
import { Search, MapPin, Calendar, Clock, Car, Users, Filter, ArrowRight, Frown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { searchRides, getLocations } from '../services/api';

const defaultLocations = [
  'VIT Chennai', 'Chennai Central', 'Chennai Airport', 'Tambaram Station', 
  'Guindy', 'T. Nagar', 'Velachery', 'Chromepet', 'Mahabalipuram',
  'Sholinganallur', 'OMR (IT Corridor)', 'Egmore'
];

const SearchRidesPage = () => {
  const [locations, setLocations] = useState(defaultLocations);
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    pickup: '', drop: '', date: '', time: '', genderPref: '', vehicleType: ''
  });

  useEffect(() => {
    getLocations()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setLocations(data.map((l) => l.locationName));
        }
      })
      .catch(() => {});
  }, []);

  const fetchRides = useCallback(async (searchParams = {}) => {
    setLoading(true);
    setError('');
    try {
      const from = searchParams.date
        ? `${searchParams.date}T${searchParams.time || '00:00'}:00`
        : undefined;
      const to = searchParams.date && !searchParams.time
        ? `${searchParams.date}T23:59:59`
        : undefined;

      const data = await searchRides({
        pickup: searchParams.pickup || undefined,
        drop: searchParams.drop || undefined,
        from,
        to,
      });
      setRides(data);
    } catch (err) {
      setError(err.message || 'Unable to load rides from server');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    searchRides()
      .then((data) => setRides(data))
      .catch((err) => setError(err.message || 'Unable to load rides from server'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  const handleSearchClick = () => {
    fetchRides(filters);
  };

  const handleClearFilters = () => {
    const cleared = { pickup: '', drop: '', date: '', time: '', genderPref: '', vehicleType: '' };
    setFilters(cleared);
    fetchRides(cleared);
  };

  const filteredRides = rides.filter(ride => {
    if (filters.pickup && ride.pickup !== filters.pickup) return false;
    if (filters.drop && ride.drop !== filters.drop) return false;
    if (filters.date && ride.date !== filters.date) return false;
    if (filters.time && ride.time !== filters.time) return false;
    if (filters.genderPref && ride.genderPref !== filters.genderPref) return false;
    if (filters.vehicleType && ride.vehicleType !== filters.vehicleType) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/40 via-blue-50/20 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Search className="w-8 h-8 text-sky-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
              Search Rides
            </h1>
          </div>
        </div>

        {/* Filter Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-sky-100">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
            <Filter className="w-5 h-5 text-sky-600" />
            <h2 className="text-lg font-semibold text-gray-800">Filter Rides</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <select name="pickup" value={filters.pickup} onChange={handleChange} className="rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 py-2.5 px-4 outline-none">
              <option value="">Any Pickup</option>
              {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
            <select name="drop" value={filters.drop} onChange={handleChange} className="rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 py-2.5 px-4 outline-none">
              <option value="">Any Destination</option>
              {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
            <input type="date" name="date" value={filters.date} onChange={handleChange} className="rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 py-2.5 px-4 outline-none" />
            <input type="time" name="time" value={filters.time} onChange={handleChange} className="rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 py-2.5 px-4 outline-none" />
            <select name="genderPref" value={filters.genderPref} onChange={handleChange} className="rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 py-2.5 px-4 outline-none">
              <option value="">Any Gender Preference</option>
              <option value="Any">Any</option>
              <option value="Male Only">Male Only</option>
              <option value="Female Only">Female Only</option>
            </select>
            <select name="vehicleType" value={filters.vehicleType} onChange={handleChange} className="rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 py-2.5 px-4 outline-none">
              <option value="">Any Vehicle Type</option>
              {['Sedan', 'SUV', 'Hatchback', 'Auto', 'Bike'].map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div className="mt-6 flex justify-end">
            <button onClick={handleClearFilters} className="px-6 py-2.5 text-gray-500 hover:text-gray-700 font-medium cursor-pointer">
              Clear Filters
            </button>
            <button onClick={handleSearchClick} className="bg-gradient-to-r from-sky-400 to-blue-400 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-2.5 px-6 rounded-xl shadow-md shadow-sky-100 transition-all flex items-center gap-2 cursor-pointer">
              <Search className="w-4 h-4" /> Search
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Results Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {loading ? 'Searching rides...' : `${filteredRides.length} rides found`}
          </h2>
          
          {!loading && filteredRides.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-sky-100 flex flex-col items-center justify-center text-center">
              <Frown className="w-16 h-16 text-blue-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">No rides found</h3>
              <p className="text-gray-500">Try adjusting your filters or create a new ride.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRides.map(ride => {
                const isCancelled = ride.status === 'Cancelled';
                
                return (
                  <div key={ride.id} className="bg-white rounded-2xl p-5 shadow-sm border border-sky-100 hover:shadow-md hover:border-sky-200 hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      
                      <div className="flex-1 space-y-3">
                        {/* Route */}
                        <div className={`flex items-center gap-3 text-lg font-bold text-gray-800 ${isCancelled ? 'line-through opacity-70' : ''}`}>
                          <MapPin className="w-5 h-5 text-sky-600 flex-shrink-0" />
                          <span>{ride.pickup}</span>
                          <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <MapPin className="w-5 h-5 text-blue-300 flex-shrink-0" />
                          <span>{ride.drop}</span>
                        </div>
                        
                        {/* Meta info */}
                        <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
                          <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {ride.date}</div>
                          <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {ride.time}</div>
                          <div className="flex items-center gap-1"><Car className="w-4 h-4" /> {ride.vehicleType}</div>
                          <div className="flex items-center gap-1"><Users className="w-4 h-4" /> {ride.seats} seats</div>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          {ride.cabApp === 'Uber' && <span className="text-xs font-medium px-2 py-1 rounded bg-gray-900 text-white">Uber</span>}
                          {ride.cabApp === 'Ola' && <span className="text-xs font-medium px-2 py-1 rounded bg-green-500 text-white">Ola</span>}
                          {ride.cabApp === 'Rapido' && <span className="text-xs font-medium px-2 py-1 rounded bg-sky-400 text-gray-900">Rapido</span>}
                          {ride.cabApp && !['Uber', 'Ola', 'Rapido'].includes(ride.cabApp) && (
                            <span className="text-xs font-medium px-2 py-1 rounded bg-gray-500 text-white">{ride.cabApp}</span>
                          )}
                          
                          <span className="text-xs font-medium px-2 py-1 rounded bg-blue-50 text-blue-500 border border-blue-200">
                            {ride.genderPref}
                          </span>
                          
                          {ride.status === 'Open' && <span className="text-xs font-medium px-2 py-1 rounded bg-green-50 text-green-600 border border-green-200">Open</span>}
                          {ride.status === 'Full' && <span className="text-xs font-medium px-2 py-1 rounded bg-amber-50 text-amber-600 border border-amber-200">Full</span>}
                          {ride.status === 'Cancelled' && <span className="text-xs font-medium px-2 py-1 rounded bg-red-50 text-red-500 border border-red-200">Cancelled</span>}
                        </div>
                      </div>

                      <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
                        <div className="text-sky-600 font-bold text-2xl mb-2">₹{ride.fare}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-xs mr-2">by {ride.creator}</span>
                          <Link 
                            to={`/ride/${ride.id}`} 
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isCancelled ? 'bg-gray-100 text-gray-400 cursor-not-allowed grayscale' : 'bg-gradient-to-r from-sky-400 to-blue-400 text-white shadow-md shadow-sky-100 hover:from-amber-600 hover:to-orange-600'}`}
                          >
                            View Details
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
    </div>
  );
};

export default SearchRidesPage;
