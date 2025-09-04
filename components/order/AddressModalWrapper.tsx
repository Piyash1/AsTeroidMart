"use client";

import React, { useState, useEffect } from 'react';
import ShippingAddressForm from './ShippingAddressForm';
import Modal from '../uiComponents/Modal';
import { getAddress } from '@/lib/api';

interface AddressModalWrapperProps {
  userEmail?: string | null | undefined;
}

const AddressModalWrapper = ({ userEmail }: AddressModalWrapperProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [existingAddress, setExistingAddress] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user has an existing address
  useEffect(() => {
    const fetchAddress = async () => {
      if (userEmail) {
        try {
          const address = await getAddress(userEmail);
          setExistingAddress(address);
        } catch (error) {
          // User doesn't have an address yet
          setExistingAddress(null);
        }
      }
      setIsLoading(false);
    };

    fetchAddress();
  }, [userEmail]);

  const handleSaveAddress = (address: any) => {
    console.log('Address saved:', address);
    // Update the existing address state after saving
    setExistingAddress(address);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Show loading state while checking for existing address
  if (isLoading) {
    return (
      <button className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg cursor-not-allowed" disabled>
        <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>Loading...</span>
      </button>
    );
  }

  return (
    <Modal 
      addressForm={true} 
      open={isModalOpen} 
      onOpenChange={setIsModalOpen}
      isUpdate={!!existingAddress}
    >
      <ShippingAddressForm 
        onSave={handleSaveAddress}
        onClose={handleCloseModal}
        userEmail={userEmail}
        existingAddress={existingAddress}
        isUpdate={!!existingAddress}
      />
    </Modal>
  );
};

export default AddressModalWrapper;
