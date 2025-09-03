import React from 'react'
import MiniProductCard from './MiniProductCard'
import { ReceiptText } from 'lucide-react'
import { timeAgo } from '@/lib/utils'
import { OrderType } from '@/lib/type'

const IndividualOrder = ({order}: {order: OrderType}) => {

  const orderItems = order.items;

  return (
    <div className='w-full bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden'>
      {/* Order Header */}
      <div className='flex items-center justify-between bg-gray-50 px-6 py-4 border-b border-gray-200'>
        <div className='flex items-center gap-2'>
          <ReceiptText className='w-5 h-5 text-green-600' />
          <p className='text-sm sm:text-base font-medium text-gray-800'>
            <span className='text-green-500'>ORDER ID:</span>
            <span className='text-green-700 font-semibold'>
              {order.stripe_checkout_id.slice(0, 12)}
            </span>
          </p>
        </div>
        <small className='text-gray-500 text-xs sm:text-sm'>
          {timeAgo(order.created_at)}
        </small>
      </div>

      {/* Order Items */}
      <div className='flex gap-4 px-6 py-6 bg-white overflow-x-auto'>
        {orderItems.map((orderitem) => <MiniProductCard key={orderitem.id} item={orderitem} />)}
      </div>
    </div>
  )
}

export default IndividualOrder