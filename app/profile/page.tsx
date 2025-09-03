import ProductSectionSkeleton from '@/components/home/ProductSectionSkeleton'
import OrderContainer from '@/components/order/OrderContainer'
import WishlistSection from '@/components/order/WishlistSection'
import AddressModalWrapper from '@/components/order/AddressModalWrapper'
import { auth } from '@/auth'
import React, { Suspense } from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Profile | AsteroiDMart',
}

const ProfilePage = async () => {
  const session = await auth();
  const userEmail = session?.user?.email;

  return (
    <>
       <div className='min-max-width mx-auto padding-x py-6 flex-center'>
        <AddressModalWrapper userEmail={userEmail} />
       </div>

       <Suspense fallback={<ProductSectionSkeleton />}>
        <OrderContainer />
       </Suspense>

       <Suspense fallback={<ProductSectionSkeleton />}>
        <WishlistSection />
       </Suspense>

    </>
  )
}

export default ProfilePage