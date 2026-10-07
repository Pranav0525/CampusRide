import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Mail, Lock, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-sky-50/40 via-blue-50/20 to-white">
      {/* Left half - hidden on mobile */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-sky-300 via-blue-300 to-sky-400 p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 text-white mb-12">
            <Car size={32} />
            <span className="text-3xl font-bold tracking-tight">CampusRide</span>
          </div>
          <h1 className="text-5xl font-bold text-white leading-tight mb-6">
            Share rides.<br />Split fares.<br />Travel smart.
          </h1>
          <p className="text-blue-50 text-lg mb-12 max-w-md">
            Join the safest and most convenient ride-sharing platform for college students.
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

      {/* Right half - login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <div className="md:hidden flex justify-center mb-6">
              <div className="bg-sky-100 p-3 rounded-2xl text-sky-600">
                <Car size={32} />
              </div>
            </div>
            <div className="hidden md:inline-block bg-sky-100 p-3 rounded-2xl text-sky-600 mb-6">
              <Car size={24} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h2>
            <p className="text-gray-500 mt-2 text-lg">Sign in to your account</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 transition-all duration-200"
                  placeholder="Email or Student ID"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 transition-all duration-200"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-sky-600 focus:ring-sky-400 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-sky-600 hover:text-sky-700 transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-sky-400 to-blue-400 hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 shadow-lg shadow-sky-100 transition-all duration-200"
              >
                Sign In
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-sky-600 hover:text-sky-700 transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
