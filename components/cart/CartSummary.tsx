"use client";

import React, { useState } from "react";
import Button from "../uiComponents/Button";
import { useCart } from "@/context/CartContext";
import { initiatePayment } from "@/lib/api";

const CartSummary = ({
  total,
  loggedInUserEmail,
}: {
  total: number;
  loggedInUserEmail: string | null | undefined;
}) => {
  const tax = 5;
  const sub_total = Number(total);
  const cart_total = (sub_total + tax).toFixed(2);

  const formattedTax = tax.toFixed(2);
  const formattedSubtotal = sub_total.toFixed(2);

  const [initiatePaymentLoader, setInitiatePaymentLoader] =useState(false)

  const { cartCode } = useCart();

  async function handleInitiatePayment() {
    const paymentInfo = { email: loggedInUserEmail, cart_code: cartCode };
    setInitiatePaymentLoader(true)

    try {
      const response = await initiatePayment(paymentInfo);
      console.log(response);
      window.location.href = response.data.url;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw new Error("An unknown error occurred");
    }

    finally {
      setInitiatePaymentLoader(false)
    }
  }

  return (
    <div className="w-full bg-white rounded-3xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-8 py-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
        <p className="text-gray-600 mt-1">Review your order details</p>
      </div>

      {/* Content */}
      <div className="px-8 py-6">
        {/* Price Breakdown */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <p className="text-gray-600 font-medium">Subtotal</p>
            <p className="text-gray-900 font-semibold text-lg">${formattedSubtotal}</p>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <p className="text-gray-600 font-medium">Estimated Tax</p>
            <p className="text-gray-900 font-semibold text-lg">${formattedTax}</p>
          </div>

          <div className="flex items-center justify-between py-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl px-4">
            <p className="text-xl font-bold text-gray-900">Total</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ${cart_total}
            </p>
          </div>
        </div>

        {/* Checkout Button */}
        <Button
          handleClick={handleInitiatePayment}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          disabled={!Boolean(loggedInUserEmail) || total < 10 || initiatePaymentLoader}
        >
          {loggedInUserEmail
            ? initiatePaymentLoader 
            ? "Redirecting to Stripe..." 
            : "Proceed to Checkout"
            : "Login to Proceed with Checkout"}
        </Button>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>Secure checkout with Stripe</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
