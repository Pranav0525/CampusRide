import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Mail, Lock, User, Hash, Phone, Users, ArrowRight } from 'lucide-react';
import { registerUser } from '../services/api';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    studentId: '',
    phone: '',
    gender: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
    if (apiError) setApiError('');
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email format is invalid';
    if (!formData.studentId) newErrors.studentId = 'Student ID is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setApiError('');
    setLoading(true);
    try {
      await registerUser({
        name: formData.fullName.trim(),
        studentId: formData.studentId.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        gender: formData.gender,
        password: formData.password,
      });
      navigate('/login');
    } catch (err) {
      setApiError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-sky-50/40 via-blue-50/20 to-white">
      {/* Left half - hidden on mobile */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-sky-300 via-blue-300 to-sky-400 p-12 flex-col justify-between sticky top-0 h-screen">
        <div>
          <div className="flex items-center gap-3 text-white mb-12">
            <Car size={32} />
            <span className="text-3xl font-bold tracking-tight">CampusRide</span>
          </div>
          <h1 className="text-5xl font-bold text-white leading-tight mb-6">
            Join<br />CampusRide
          </h1>
          <p className="text-blue-50 text-lg mb-12 max-w-md">
            Create your account and start sharing rides with fellow students safely and conveniently.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-white/90">
              <div className="bg-white/20 p-2 rounded-lg">🚕</div>
              <span className="text-lg">Find rides instantly</span>
            </div>
            <div className="flex items-center gap-4 text-white/90">
              <div className="bg-white/20 p-2 rounded-lg">💰</div>
              <span className="text-lg">Split fares fairly</span>
            </div>
            <div className="flex items-center gap-4 text-white/90">
              <div className="bg-white/20 p-2 rounded-lg">👥</div>
              <span className="text-lg">Travel with classmates</span>
            </div>
          </div>
        </div>
        <div className="text-sky-100/60 text-sm">
          © 2026 CampusRide. All rights reserved.
        </div>
      </div>

      {/* Right half - register form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left pt-8 md:pt-0">
            <div className="md:hidden flex justify-center mb-6">
              <div className="bg-sky-100 p-3 rounded-2xl text-sky-600">
                <Car size={32} />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Create Account</h2>
            <p className="text-gray-500 mt-2 text-lg">Join the CampusRide community</p>
          </div>

          {apiError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
              {apiError}
            </div>
          )}

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="fullName"
                  type="text"
                  className={`block w-full pl-11 pr-4 py-3 bg-white border ${errors.fullName ? 'border-red-500' : 'border-gray-200'} rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 transition-all duration-200`}
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  className={`block w-full pl-11 pr-4 py-3 bg-white border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 transition-all duration-200`}
                  placeholder="College Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Hash className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="studentId"
                    type="text"
                    className={`block w-full pl-11 pr-4 py-3 bg-white border ${errors.studentId ? 'border-red-500' : 'border-gray-200'} rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 transition-all duration-200`}
                    placeholder="Student ID"
                    value={formData.studentId}
                    onChange={handleChange}
                  />
                  {errors.studentId && <p className="mt-1 text-xs text-red-500">{errors.studentId}</p>}
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="phone"
                    type="tel"
                    className={`block w-full pl-11 pr-4 py-3 bg-white border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 transition-all duration-200`}
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  name="gender"
                  className={`block w-full pl-11 pr-10 py-3 bg-white border ${errors.gender ? 'border-red-500' : 'border-gray-200'} rounded-xl text-gray-900 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 transition-all duration-200 appearance-none`}
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender}</p>}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="password"
                  type="password"
                  className={`block w-full pl-11 pr-4 py-3 bg-white border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 transition-all duration-200`}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="confirmPassword"
                  type="password"
                  className={`block w-full pl-11 pr-4 py-3 bg-white border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 transition-all duration-200`}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-sky-400 to-blue-400 hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 shadow-lg shadow-sky-100 transition-all duration-200 disabled:opacity-60"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 pb-8 md:pb-0">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-sky-600 hover:text-sky-700 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
