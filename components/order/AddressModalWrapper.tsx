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
      <button className="address-btn" disabled>
        Loading...
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
