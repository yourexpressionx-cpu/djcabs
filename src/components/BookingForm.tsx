'use client';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { VEHICLE_TYPES, type VehicleType } from '@/types';

interface BookingFormData {
  fullName: string;
  phone: string;
  pickupLocation: string;
  dropLocation: string;
  pickupDate: string;
  pickupTime: string;
  passengers: number;
  vehicleType: VehicleType;
  message: string;
}

const initialFormData: BookingFormData = {
  fullName: '',
  phone: '',
  pickupLocation: '',
  dropLocation: '',
  pickupDate: '',
  pickupTime: '',
  passengers: 1,
  vehicleType: 'SEDAN',
  message: '',
};

const WHATSAPP_NUMBER = '+917407616130';
const BOOKING_EMAIL = 'darjeelingcabs.com@gmail.com';

export default function BookingForm() {
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 1 : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const selectedVehicle = VEHICLE_TYPES[formData.vehicleType];
    const messageText = `
Booking Request:
Name: ${formData.fullName}
Phone: ${formData.phone}
From: ${formData.pickupLocation}
To: ${formData.dropLocation}
Date: ${formData.pickupDate}
Time: ${formData.pickupTime}
Passengers: ${formData.passengers}
Vehicle: ${selectedVehicle.name} (${selectedVehicle.capacity})
Additional Notes: ${formData.message}
    `.trim();

    // Create WhatsApp link
    const whatsappText = encodeURIComponent(messageText);
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;

    // Create mailto link
    const emailSubject = encodeURIComponent(
      `Cab Booking Request from ${formData.fullName}`
    );
    const emailBody = encodeURIComponent(messageText);
    const emailLink = `mailto:${BOOKING_EMAIL}?subject=${emailSubject}&body=${emailBody}`;

    // Open WhatsApp in new tab
    window.open(whatsappLink, '_blank');

    // Open email client
    window.location.href = emailLink;

    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-lg shadow-lg space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              placeholder="Enter your full name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="Enter your phone number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700">
              Pickup Location *
            </label>
            <input
              type="text"
              id="pickupLocation"
              name="pickupLocation"
              required
              placeholder="e.g., Bagdogra Airport"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.pickupLocation}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="dropLocation" className="block text-sm font-medium text-gray-700">
              Drop Location *
            </label>
            <input
              type="text"
              id="dropLocation"
              name="dropLocation"
              required
              placeholder="e.g., Darjeeling Mall Road"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.dropLocation}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700">
              Pickup Date *
            </label>
            <input
              type="date"
              id="pickupDate"
              name="pickupDate"
              required
              min={new Date().toISOString().split('T')[0]}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.pickupDate}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700">
              Pickup Time *
            </label>
            <input
              type="time"
              id="pickupTime"
              name="pickupTime"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.pickupTime}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">
              Vehicle Type *
            </label>
            <select
              id="vehicleType"
              name="vehicleType"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.vehicleType}
              onChange={handleInputChange}
            >
              {Object.values(VEHICLE_TYPES).map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id.toUpperCase()}>
                  {vehicle.name} - {vehicle.capacity} - From ₹{vehicle.basePrice}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="passengers" className="block text-sm font-medium text-gray-700">
              Number of Passengers *
            </label>
            <input
              type="number"
              id="passengers"
              name="passengers"
              required
              min={1}
              max={16}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.passengers}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Additional Requirements
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Any special requests or requirements?"
            value={formData.message}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">* Required fields</p>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Book Now
          </button>
        </div>

        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-4 bg-green-50 text-green-800 rounded-md"
          >
            <p>Thank you for your booking request! We will contact you shortly.</p>
            <p className="text-sm mt-2">If nothing opens automatically, please check your popup blocker settings.</p>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}