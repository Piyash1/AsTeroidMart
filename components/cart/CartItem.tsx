"use client"

import React from 'react'
import Image from "next/image"
import { Minus, Plus, X, TrashIcon } from 'lucide-react'
import Button from '../uiComponents/Button'
import { CartItemtype } from '@/lib/type'
import { MEDIA_BASE_URL } from '@/lib/api'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { toast } from 'react-toastify'
import { updateCartitemQuantity, deleteCartItem } from '@/lib/actions'
import Modal from '../uiComponents/Modal'

const CartItem = ({cartitem}: {cartitem: CartItemtype}) => {

  const {cartCode, setCartItemsCount, refreshCartStats} = useCart();

  const sub_total = Number(cartitem.sub_total)
  const formattedSubtotal = sub_total.toFixed(2)

  const [quantity, setQuantity] = useState(cartitem.quantity)
  const [cartitemUpdateLoading, setCartitemUpdateLoading] = useState(false);
  const [cartitemDeleteLoading, setCartitemDeleteLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [counter, setCounter] = useState(0);

  function increaseQuantity() {
    setQuantity(quantity + 1)
    setCounter(counter + 1)
  }
  function decreaseQuantity() {
    setQuantity(quantity - 1)
    setCounter(counter - 1)
  }

  async function handleUpdateCartItem() {
    setCartitemUpdateLoading(true);
    const formData = new FormData();
    formData.set("quantity", quantity.toString());
    formData.set("item_id", cartitem.id.toString());
    formData.set("cart_code", cartCode? cartCode : "");

    try {
      await updateCartitemQuantity(formData);
      setCartItemsCount(current => current + counter)
      toast.success("Cart item updated successfully");
    } 

    catch (err: unknown) {
      if(err instanceof Error) {
        toast.error(err.message);
      }
      else {
        toast.error("An unknown error occurred");
      }
    }
    finally {
      setCartitemUpdateLoading(false);
    }
  }

  async function handleDeleteCartItem() {
    setCartitemDeleteLoading(true);
    const formData = new FormData();
    formData.set("item_id", cartitem.id.toString());
    formData.set("cart_code", cartCode? cartCode : "");

    try {
      await deleteCartItem(formData);
      setCartItemsCount(current => Math.max(0, current - 1));
      await refreshCartStats();
      setShowDeleteModal(false);
      toast.success("Cart item deleted successfully");
    } 

    catch (err: unknown) {
      if(err instanceof Error) {
        toast.error(err.message);
      }
      else {
        toast.error("An unknown error occurred");
      }
    }
    finally {
      setCartitemDeleteLoading(false);
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-6 border-b border-gray-200 py-4 mb-6 w-full flex-wrap bg-white px-4 rounded-lg shadow-sm">
      
          {/* Product Image */}
          <div className="relative overflow-hidden w-[70px] h-[70px] rounded-lg border border-gray-200">
            <Image
              src={`${MEDIA_BASE_URL}${cartitem.product.image}`}
              alt="cartitem-img"
              className="object-cover"
              fill
            />
          </div>
      
          {/* Product Details - Name and Price */}
          <div className="flex-1 min-w-[120px]">
            <p className="font-semibold text-gray-800">{cartitem.product.name}</p>
            <p className="text-gray-600 text-sm mt-1">${cartitem.product.price}</p>
          </div>
      
          {/* Quantity Selector */}
          <div className="flex items-center justify-center gap-2 bg-gray-100 px-2 py-1 rounded-md">
            {/* Decrease Quantity Button */}
            <button 
              className="p-2 rounded-md bg-white border hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="w-5 h-5 text-gray-700" />
            </button>
      
            {/* Quantity Display */}
            <div className="w-[50px] h-[40px] flex items-center justify-center font-medium bg-white border border-gray-300 rounded-md shadow-sm">
              {quantity}
            </div>
      
            {/* Increase Quantity Button */}
            <button 
            onClick={increaseQuantity}
              className="p-2 rounded-md bg-white border hover:bg-gray-200 transition cursor-pointer"
            >
              <Plus className="w-5 h-5 text-gray-700" />
            </button>
          </div>
      
          {/* Subtotal Price */}
          <p className="text-lg font-semibold text-gray-800">${formattedSubtotal}</p>
      
          {/* Remove Item Button */}
          <button 
            onClick={() => setShowDeleteModal(true)}
            disabled={cartitemDeleteLoading}
            className="p-2 rounded-md bg-red-50 hover:bg-red-100 transition text-red-500 border border-red-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-5 h-5" />
          </button>
      
          {/* Update Cart Button */}
          <Button className='update-item-btn' disabled={cartitemUpdateLoading} handleClick={handleUpdateCartItem}>
            {cartitemUpdateLoading ? "Updating..." : "Update Cart"}
          </Button>
       
        </div>

        {/* Delete Confirmation Modal */}
        <Modal 
          editMode={true}
          open={showDeleteModal}
          onOpenChange={setShowDeleteModal}
        >
          <div className="w-full mx-auto bg-white rounded-xl p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <TrashIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Delete Cart Item
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{cartitem.product.name}" from your cart? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <Button 
                  onClick={handleCancelDelete}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition cursor-pointer"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleDeleteCartItem}
                  disabled={cartitemDeleteLoading}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cartitemDeleteLoading ? "Deleting..." : "Delete Item"}
                </Button>
              </div>
            </div>
          </div>
        </Modal>
    </>
  )
}

export default CartItem