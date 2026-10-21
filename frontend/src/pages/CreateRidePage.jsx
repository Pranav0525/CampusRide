import React, { useState, useEffect } from 'react';
import { MapPin, Car, Users, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getLocations, createRide, getStoredUser } from '../services/api';

const fallbackLocations = [
  { locationId: 1, locationName: 'VIT Chennai' },
  { locationId: 2, locationName: 'Chennai Airport' },
  { locationId: 3, locationName: 'Chennai Central' },
  { locationId: 4, locationName: 'Tambaram Station' },
  { locationId: 5, locationName: 'Guindy' },
  { locationId: 6, locationName: 'T. Nagar' },
  { locationId: 7, locationName: 'Velachery' },
  { locationId: 8, locationName: 'Chromepet' },
  { locationId: 9, locationName: 'Mahabalipuram' },
  { locationId: 10, locationName: 'Sholinganallur' },
  { locationId: 11, locationName: 'OMR (IT Corridor)' },
  { locationId: 12, locationName: 'Egmore' },
];

const InputWrapper = ({ label, required, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-gray-700">
      {label} {required && <span className="text-blue-400">*</span>}
    </label>
    {children}
  </div>
);

const CreateRidePage = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState(fallbackLocations);
  const [formData, setFormData] = useState({
    pickup: '', drop: '', date: '', time: '',
    cabApp: '', vehicleType: '', fare: '', seats: '',
    genderPref: 'Any', preBooked: 'No',
    driverName: '', driverPhone: '', vehicleNumber: '', vehicleColor: '', additionalNotes: ''
  });
  const [showOptional, setShowOptional] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLocations()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setLocations(data);
        }
      })
      .catch(() => {
        // Keep fallbackLocations if backend is unreachable
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.pickup || !formData.drop || !formData.date || !formData.time || 
        !formData.cabApp || !formData.vehicleType || !formData.fare || !formData.seats) {
      setError('Please fill all required fields');
      return;
    }
    if (formData.pickup === formData.drop) {
      setError('Pickup and drop locations cannot be the same');
      return;
    }

    const currentUser = getStoredUser();
    if (!currentUser?.userId) {
      setError('Please log in before creating a ride');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const startDateTime = `${formData.date}T${formData.time}:00`;
      const created = await createRide({
        creatorId: currentUser.userId,
        pickupLocationId: Number(formData.pickup),
        dropLocationId: Number(formData.drop),
        startDateTime,
        cabProvider: formData.cabApp,
        cabType: formData.vehicleType,
        totalSeats: Number(formData.seats),
        genderPreference: formData.genderPref,
        estimatedFare: Number(formData.fare),
        notes: formData.additionalNotes || null,
        preBooked: formData.preBooked === 'Yes',
        driverName: formData.driverName || null,
        driverPhone: formData.driverPhone || null,
        vehicleNumber: formData.vehicleNumber || null,
        vehicleColor: formData.vehicleColor || null,
      });
      navigate(`/ride/${created.id}`);
    } catch (err) {
      setError(err.message || 'Failed to create ride');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/40 via-blue-50/20 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link to="/dashboard" className="inline-flex items-center text-sky-600 hover:text-sky-700 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-sky-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
              Create a Ride
            </h1>
          </div>
        </div>

        {error && <div className="text-red-500 text-sm font-medium p-3 bg-red-50 rounded-lg border border-red-100">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Route Details */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-sky-100">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
              <MapPin className="w-5 h-5 text-sky-600" />
              <h2 className="text-lg font-semibold text-gray-800">Route Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputWrapper label="Pickup Location" required>
                <select name="pickup" value={formData.pickup} onChange={handleChange} className="w-full rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 py-2.5 px-4 outline-none transition-all">
                  <option value="">Select location</option>
                  {locations.map(loc => (
                    <option key={loc.locationId} value={loc.locationId}>
                      {loc.locationName}
                    </option>
                  ))}
                </select>
              </InputWrapper>
              <InputWrapper label="Drop Location" required>
                <select name="drop" value={formData.drop} onChange={handleChange} className="w-full rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 py-2.5 px-4 outline-none transition-all">
                  <option value="">Select location</option>
                  {locations.map(loc => (
                    <option key={loc.locationId} value={loc.locationId}>
                      {loc.locationName}
                    </option>
                  ))}
                </select>
              </InputWrapper>
              <InputWrapper label="Travel Date" required>
                <input type="date" name="date" min={today} value={formData.date} onChange={handleChange} className="w-full rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 py-2.5 px-4 outline-none transition-all" />
              </InputWrapper>
              <InputWrapper label="Travel Time" required>
                <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 py-2.5 px-4 outline-none transition-all" />
              </InputWrapper>
            </div>
          </div>

          {/* Ride Details */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-sky-100">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
              <Car className="w-5 h-5 text-sky-600" />
              <h2 className="text-lg font-semibold text-gray-800">Ride Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputWrapper label="Cab App" required>
                <select name="cabApp" value={formData.cabApp} onChange={handleChange} className="w-full rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 py-2.5 px-4 outline-none transition-all">
                  <option value="">Select app</option>
                  {['Uber', 'Ola', 'Rapido', 'Other'].map(app => <option key={app} value={app}>{app}</option>)}
                </select>
              </InputWrapper>
              <InputWrapper label="Vehicle Type" required>
                <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="w-full rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 py-2.5 px-4 outline-none transition-all">
                  <option value="">Select type</option>
                  {['Sedan', 'SUV', 'Hatchback', 'Auto', 'Bike'].map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </InputWrapper>
              <InputWrapper label="Total Fare (₹)" required>
                <input type="number" name="fare" min="0" value={formData.fare} onChange={handleChange} placeholder="e.g. 500" className="w-full rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 py-2.5 px-4 outline-none transition-all" />
              </InputWrapper>
              <InputWrapper label="Available Seats" required>
                <input type="number" name="seats" min="1" max="6" value={formData.seats} onChange={handleChange} placeholder="e.g. 3" className="w-full rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 py-2.5 px-4 outline-none transition-all" />
              </InputWrapper>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-sky-100">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
              <Users className="w-5 h-5 text-sky-600" />
              <h2 className="text-lg font-semibold text-gray-800">Preferences</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputWrapper label="Gender Preference">
                <select name="genderPref" value={formData.genderPref} onChange={handleChange} className="w-full rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 py-2.5 px-4 outline-none transition-all">
                  {['Any', 'Male Only', 'Female Only'].map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </InputWrapper>
              <InputWrapper label="Already Pre-booked?">
                <select name="preBooked" value={formData.preBooked} onChange={handleChange} className="w-full rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 py-2.5 px-4 outline-none transition-all">
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </InputWrapper>
            </div>
          </div>

          {/* Additional Details */}
          <div className={`rounded-2xl shadow-sm border border-sky-100 overflow-hidden transition-colors ${showOptional ? 'bg-gradient-to-br from-sky-50 to-blue-50' : 'bg-white'}`}>
            <button type="button" onClick={() => setShowOptional(!showOptional)} className="w-full flex items-center justify-between p-6 focus:outline-none">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-800">Additional Details (Optional)</h2>
              </div>
              {showOptional ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
            </button>
            
            {showOptional && (
              <div className="px-6 pb-6 pt-2 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-sky-100/50">
                <InputWrapper label="Driver Name">
                  <input type="text" name="driverName" value={formData.driverName} onChange={handleChange} className="w-full rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 py-2.5 px-4 outline-none transition-all bg-white" />
                </InputWrapper>
                <InputWrapper label="Driver Phone">
                  <input type="tel" name="driverPhone" value={formData.driverPhone} onChange={handleChange} className="w-full rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 py-2.5 px-4 outline-none transition-all bg-white" />
                </InputWrapper>
                <InputWrapper label="Vehicle Number">
                  <input type="text" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} className="w-full rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 py-2.5 px-4 outline-none transition-all bg-white" />
                </InputWrapper>
                <InputWrapper label="Vehicle Color">
                  <input type="text" name="vehicleColor" value={formData.vehicleColor} onChange={handleChange} className="w-full rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 py-2.5 px-4 outline-none transition-all bg-white" />
                </InputWrapper>
                <div className="md:col-span-2">
                  <InputWrapper label="Additional Notes">
                    <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} rows="3" className="w-full rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 py-2.5 px-4 outline-none transition-all resize-none bg-white"></textarea>
                  </InputWrapper>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-sky-400 to-blue-400 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-sky-100 transition-all transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {loading ? 'Creating Ride...' : 'Create Ride'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRidePage;
