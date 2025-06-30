import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SalonCard from './components/SalonCard';
import FilterPanel from './components/FilterPanel';
import BookingModal from './components/BookingModal';
import AuthModal from './components/AuthModal';
import { sampleSalons, Salon } from './data/sampleSalons';
import { Search, MapPin, Star, TrendingUp, Users } from 'lucide-react';

function App() {
  const [salons, setSalons] = useState(sampleSalons);
  const [filteredSalons, setFilteredSalons] = useState(sampleSalons);
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);

  const handleFiltersChange = (filters: any) => {
    let filtered = [...sampleSalons];

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(salon => 
        salon.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter(salon => 
      salon.pricePerHour <= filters.priceRange[1]
    );

    // Availability filter
    if (filters.availability === 'today') {
      filtered = filtered.filter(salon => salon.availableToday);
    }

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(salon => salon.rating >= filters.rating);
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(salon =>
        filters.amenities.every((amenity: string) =>
          salon.amenities.some(salonAmenity => 
            salonAmenity.toLowerCase().includes(amenity.toLowerCase())
          )
        )
      );
    }

    setFilteredSalons(filtered);
  };

  const handleBookNow = (salon: Salon) => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    setSelectedSalon(salon);
    setIsBookingModalOpen(true);
  };

  const handleViewDetails = (salon: Salon) => {
    // For now, just trigger booking modal
    handleBookNow(salon);
  };

  const handleLogin = (userData: any) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
  };

  const handleConfirmBooking = (bookingData: any) => {
    const newBooking = {
      id: Date.now().toString(),
      ...bookingData,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    setBookings([...bookings, newBooking]);
    setIsBookingModalOpen(false);
    setSelectedSalon(null);
    
    // Show success message (you could implement a toast notification here)
    alert('Booking confirmed! You will receive a confirmation email shortly.');
  };

  const stats = [
    { icon: MapPin, label: 'Cities', value: '50+' },
    { icon: Star, label: 'Average Rating', value: '4.8' },
    { icon: Users, label: 'Happy Clients', value: '10K+' },
    { icon: TrendingUp, label: 'Bookings', value: '25K+' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onAuthClick={() => setIsAuthModalOpen(true)}
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Salon Space
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              Book premium salon spaces by the hour. Work in beautiful, fully-equipped studios 
              without the overhead.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-2xl mx-auto">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Where do you want to work?"
                  className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 text-lg focus:ring-4 focus:ring-purple-300 focus:outline-none"
                />
              </div>
              <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors transform hover:scale-105 whitespace-nowrap">
                Search Salons
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-80">
            <FilterPanel onFiltersChange={handleFiltersChange} />
          </aside>

          {/* Salon Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Available Salons</h2>
                <p className="text-gray-600">{filteredSalons.length} spaces found</p>
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <option>Sort by: Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating: Highest</option>
                <option>Distance: Nearest</option>
              </select>
            </div>

            {filteredSalons.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No salons found</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Try adjusting your filters or search in a different area to find available salon spaces.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredSalons.map((salon) => (
                  <SalonCard
                    key={salon.id}
                    salon={salon}
                    onBookNow={handleBookNow}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      {selectedSalon && (
        <BookingModal
          salon={selectedSalon}
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false);
            setSelectedSalon(null);
          }}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="ml-3 text-2xl font-bold">SalonSpace</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                The premier platform for booking salon spaces. Find your perfect workspace and grow your beauty business.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Professionals</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Browse Spaces</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Salon Owners</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">List Your Space</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SalonSpace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;