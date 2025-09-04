import React from 'react'
import EmptyState from '@/components/ui/EmptyState'

const CartPage = () => {
  const cartIcon = (
    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
    </svg>
  )

  return (
    <section className="w-full bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="main-max-width mx-auto padding-x relative">
        <EmptyState
          icon={cartIcon}
          title="Your Cart is Empty"
          description="Looks like you haven't added any items to your cart yet. Start shopping to discover amazing products and fill your cart with things you love!"
          primaryAction={{
            label: "Start Shopping",
            href: "/"
          }}
          secondaryAction={{
            label: "Browse Categories",
            href: "/#product_section"
          }}
        />
      </div>
    </section>
  )
}

export default CartPage