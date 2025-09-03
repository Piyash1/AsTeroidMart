"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import Button from '../uiComponents/Button';
import { toast } from 'react-toastify';
import { addAddress } from '@/lib/api';

interface ShippingAddressFormProps {
  onSave?: (address: ShippingAddress) => void;
  onClose?: () => void;
  userEmail?: string | null | undefined;
  existingAddress?: any;
  isUpdate?: boolean;
}

interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  phone: string;
}

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({ onSave, onClose, userEmail, existingAddress, isUpdate }) => {
  const [formData, setFormData] = useState<ShippingAddress>({
    street: existingAddress?.street || '',
    city: existingAddress?.city || '',
    state: existingAddress?.state || '',
    phone: existingAddress?.phone || ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check if user is logged in
      if (!userEmail) {
        toast.error("Please log in to save your address");
        return;
      }

      // Prepare data for API call
      const addressData = {
        email: userEmail,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        phone: formData.phone
      };

      // Call the API to save address
      const response = await addAddress(addressData);
      console.log('Address saved successfully:', response);
      
      if (onSave) {
        onSave(formData);
      }
      
      // Show success message
      toast.success(isUpdate ? "Shipping address updated successfully!" : "Shipping address saved successfully!");
      
      // Reset form
      setFormData({
        street: '',
        city: '',
        state: '',
        phone: ''
      });
      
      // Close modal
      if (onClose) {
        onClose();
      }
      
    } catch (error) {
      console.error('Error saving address:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to save address. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto bg-white rounded-xl p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
        {isUpdate ? "Update Shipping Address" : "Add Shipping Address"}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Street Address */}
        <div>
          <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">
            Street Address *
          </label>
          <Input
            type="text"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleInputChange}
            required
            placeholder="Enter your street address"
          />
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <Input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
            placeholder="Enter your city"
          />
        </div>

        {/* State */}
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          <Input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
            placeholder="Enter your state"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            placeholder="Enter your phone number"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (isUpdate ? 'Updating...' : 'Saving...') : (isUpdate ? 'Update Address' : 'Save Address')}
          </Button>
          
          {onClose && (
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md font-medium transition-colors"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ShippingAddressForm;