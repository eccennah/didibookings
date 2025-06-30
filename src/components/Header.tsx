import React, { useState } from 'react';
import { Search, Menu, X, User, Calendar, MapPin } from 'lucide-react';

interface HeaderProps {
  onAuthClick: () => void;
  isAuthenticated: boolean;
  currentUser?: { name: string; type: 'owner' | 'renter' };
}

export default function Header({ onAuthClick, isAuthenticated, currentUser }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                SalonSpace
              </span>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                placeholder="Search by location, salon name..."
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Browse Salons</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">List Your Space</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">How It Works</a>
            </nav>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-purple-50">
                  <User className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">{currentUser?.name}</span>
                  <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full">
                    {currentUser?.type}
                  </span>
                </div>
                <button className="flex items-center space-x-1 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                  <Calendar className="h-4 w-4" />
                  <span>My Bookings</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Search salons..."
                />
              </div>
              
              {/* Mobile Navigation */}
              <nav className="space-y-2">
                <a href="#" className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors">Browse Salons</a>
                <a href="#" className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors">List Your Space</a>
                <a href="#" className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors">How It Works</a>
              </nav>
              
              {isAuthenticated ? (
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 px-3 py-2">
                    <User className="h-4 w-4 text-purple-600" />
                    <span className="font-medium">{currentUser?.name}</span>
                  </div>
                  <button className="block w-full text-left px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                    My Bookings
                  </button>
                </div>
              ) : (
                <button
                  onClick={onAuthClick}
                  className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-medium text-center"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}