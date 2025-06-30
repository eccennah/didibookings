import React from 'react';
import { MapPin, Star, Clock, Wifi, Car, Coffee, Scissors, Palette } from 'lucide-react';

interface Salon {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  pricePerHour: number;
  image: string;
  amenities: string[];
  availableToday: boolean;
  nextAvailable?: string;
  description: string;
}

interface SalonCardProps {
  salon: Salon;
  onBookNow: (salon: Salon) => void;
  onViewDetails: (salon: Salon) => void;
}

export default function SalonCard({ salon, onBookNow, onViewDetails }: SalonCardProps) {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="h-4 w-4" />;
      case 'parking': return <Car className="h-4 w-4" />;
      case 'coffee': return <Coffee className="h-4 w-4" />;
      case 'styling tools': return <Scissors className="h-4 w-4" />;
      case 'color station': return <Palette className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={salon.image}
          alt={salon.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          {salon.availableToday ? (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Available Today
            </span>
          ) : (
            <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Next: {salon.nextAvailable}
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-white bg-opacity-90 text-purple-800 px-2 py-1 rounded-full text-sm font-bold">
            ${salon.pricePerHour}/hr
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{salon.name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">{salon.rating}</span>
            <span className="text-sm text-gray-500">({salon.reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{salon.location}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{salon.description}</p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {salon.amenities.slice(0, 4).map((amenity, index) => (
            <div key={index} className="flex items-center space-x-1 bg-purple-50 text-purple-700 px-2 py-1 rounded-lg text-xs">
              {getAmenityIcon(amenity)}
              <span>{amenity}</span>
            </div>
          ))}
          {salon.amenities.length > 4 && (
            <span className="text-xs text-gray-500 px-2 py-1">+{salon.amenities.length - 4} more</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={() => onViewDetails(salon)}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            View Details
          </button>
          <button
            onClick={() => onBookNow(salon)}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 font-medium"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}