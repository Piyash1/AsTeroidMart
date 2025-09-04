import ProductSectionSkeleton from '@/components/home/ProductSectionSkeleton'
import OrderContainer from '@/components/order/OrderContainer'
import WishlistSection from '@/components/order/WishlistSection'
import AddressModalWrapper from '@/components/order/AddressModalWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import { auth } from '@/auth'
import React, { Suspense } from 'react'
import { Metadata } from "next";
import Link from 'next/link'
import { FaHome, FaChevronRight, FaUser, FaMapMarkerAlt, FaShoppingBag, FaHeart } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'My Profile | AsteroidMart',
  description: 'Manage your account, orders, and preferences at AsteroidMart',
}

const ProfilePage = async () => {
  const session = await auth();
  const userEmail = session?.user?.email;
  const userName = session?.user?.name;
  const userImage = session?.user?.image;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Breadcrumb Navigation */}
      <div className="main-max-width mx-auto padding-x pt-8">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <FaHome className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <FaChevronRight className="w-3 h-3" />
          <span className="text-gray-900 font-medium">My Profile</span>
        </nav>
      </div>

      {/* Profile Header */}
      <div className="main-max-width mx-auto padding-x mb-12">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="flex items-center gap-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                {userImage ? (
                  <img
                    src={userImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <FaUser className="w-8 h-8 text-white" />
                  </div>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {userName || 'User'}!
              </h1>
              <p className="text-lg text-gray-600 mb-4">{userEmail}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Account Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Premium Member</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div className="main-max-width mx-auto padding-x mb-12">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-lg">
                <FaMapMarkerAlt className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Shipping Address</h2>
                <p className="text-gray-600">Manage your delivery address</p>
              </div>
            </div>
            <AddressModalWrapper userEmail={userEmail} />
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className="main-max-width mx-auto padding-x mb-12">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center shadow-lg">
              <FaShoppingBag className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
              <p className="text-gray-600">Track your purchases and orders</p>
            </div>
          </div>
          <Suspense fallback={<ProductSectionSkeleton />}>
            <OrderContainer />
          </Suspense>
        </div>
      </div>

      {/* Wishlist Section */}
      <div className="main-max-width mx-auto padding-x mb-16">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl flex items-center justify-center shadow-lg">
              <FaHeart className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">My Wishlist</h2>
              <p className="text-gray-600">Products you've saved for later</p>
            </div>
          </div>
          <Suspense fallback={<ProductSectionSkeleton />}>
            <WishlistSection />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage