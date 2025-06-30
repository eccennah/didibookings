import React, { useState } from 'react';
import { X, Calendar, Clock, User, CreditCard, MapPin, Star } from 'lucide-react';

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

interface BookingModalProps {
  salon: Salon;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (bookingData: any) => void;
}

export default function BookingModal({ salon, isOpen, onClose, onConfirmBooking }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(2);
  const [clientName, setClientName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [step, setStep] = useState(1);

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const serviceTypes = [
    'Hair Styling', 'Hair Coloring', 'Hair Cut', 'Nail Services', 'Makeup', 'Facial', 'Massage', 'Other'
  ];

  const totalCost = salon.pricePerHour * duration;

  if (!isOpen) return null;

  const handleConfirm = () => {
    const bookingData = {
      salon,
      date: selectedDate,
      time: selectedTime,
      duration,
      clientName,
      serviceType,
      totalCost
    };
    onConfirmBooking(bookingData);
    onClose();
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Book Your Space</h2>
            <p className="text-gray-600">Step {step} of 3</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4">
          <div className="flex items-center">
            {[1, 2, 3].map((stepNumber) => (
              <React.Fragment key={stepNumber}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    step > stepNumber ? 'bg-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Salon Info */}
          <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg mb-6">
            <img src={salon.image} alt={salon.name} className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{salon.name}</h3>
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{salon.location}</span>
              </div>
              <div className="flex items-center text-sm">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span>{salon.rating} ({salon.reviewCount} reviews)</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-purple-600">${salon.pricePerHour}</p>
              <p className="text-sm text-gray-600">per hour</p>
            </div>
          </div>

          {/* Step 1: Date & Time */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedTime === time
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours)</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((hours) => (
                    <option key={hours} value={hours}>{hours} hour{hours > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Service Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Enter client's name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select service type</option>
                  {serviceTypes.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Booking Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span>{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{duration} hour{duration > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-purple-600 pt-2 border-t">
                    <span>Total:</span>
                    <span>${totalCost}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">Ready to Confirm</h4>
                <p className="text-green-700 text-sm">
                  Your booking details look great! Click confirm to secure your salon space.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Final Booking Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Salon:</span>
                    <span className="font-medium">{salon.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date & Time:</span>
                    <span>{selectedDate} at {selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{duration} hour{duration > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Client:</span>
                    <span>{clientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span>{serviceType}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg text-purple-600 pt-2 border-t">
                    <span>Total Cost:</span>
                    <span>${totalCost}</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-amber-700 text-sm">
                  <CreditCard className="h-4 w-4 inline mr-1" />
                  Payment will be processed securely. You'll receive a confirmation email once your booking is complete.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200">
          <div className="flex space-x-3">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            {step < 3 ? (
              <button
                onClick={nextStep}
                disabled={
                  (step === 1 && (!selectedDate || !selectedTime)) ||
                  (step === 2 && (!clientName || !serviceType))
                }
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleConfirm}
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all"
              >
                Confirm Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}