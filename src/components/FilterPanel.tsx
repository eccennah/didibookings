import React, { useState } from 'react';
import { Filter, MapPin, DollarSign, Clock, Star, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterPanelProps {
  onFiltersChange: (filters: any) => void;
}

export default function FilterPanel({ onFiltersChange }: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    priceRange: [0, 200],
    availability: 'any',
    rating: 0,
    amenities: [] as string[]
  });

  const amenityOptions = [
    'WiFi', 'Parking', 'Coffee', 'Styling Tools', 'Color Station', 
    'Wash Basin', 'Air Conditioning', 'Music System', 'Reception Area'
  ];

  const updateFilters = (newFilters: any) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const toggleAmenity = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    updateFilters({ amenities: newAmenities });
  };

  const clearFilters = () => {
    const resetFilters = {
      location: '',
      priceRange: [0, 200],
      availability: 'any',
      rating: 0,
      amenities: []
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
          {(filters.location || filters.amenities.length > 0 || filters.rating > 0) && (
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </div>

      {/* Filters Content */}
      {isExpanded && (
        <div className="p-4 border-t border-gray-200 space-y-6">
          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="h-4 w-4 inline mr-1" />
              Location
            </label>
            <input
              type="text"
              value={filters.location}
              onChange={(e) => updateFilters({ location: e.target.value })}
              placeholder="Enter city or area"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="h-4 w-4 inline mr-1" />
              Price Range (per hour)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="200"
                value={filters.priceRange[1]}
                onChange={(e) => updateFilters({ priceRange: [0, Number(e.target.value)] })}
                className="flex-1"
              />
              <span className="text-sm font-medium text-gray-600 min-w-[60px]">
                $0 - ${filters.priceRange[1]}
              </span>
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="h-4 w-4 inline mr-1" />
              Availability
            </label>
            <select
              value={filters.availability}
              onChange={(e) => updateFilters({ availability: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="any">Any time</option>
              <option value="today">Available today</option>
              <option value="week">This week</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Star className="h-4 w-4 inline mr-1" />
              Minimum Rating
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => updateFilters({ rating: rating === filters.rating ? 0 : rating })}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg border transition-colors hover:bg-gray-50"
                  style={{
                    backgroundColor: filters.rating >= rating ? '#f3f4f6' : 'white',
                    borderColor: filters.rating >= rating ? '#9333ea' : '#d1d5db'
                  }}
                >
                  <Star 
                    className={`h-4 w-4 ${filters.rating >= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                  <span className="text-sm">{rating}+</span>
                </button>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
            <div className="grid grid-cols-2 gap-2">
              {amenityOptions.map((amenity) => (
                <button
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    filters.amenities.includes(amenity)
                      ? 'bg-purple-100 text-purple-800 border border-purple-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="w-full px-4 py-2 text-purple-600 border border-purple-300 rounded-lg hover:bg-purple-50 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}