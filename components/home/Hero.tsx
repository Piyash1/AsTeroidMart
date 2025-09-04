"use client";

import React from 'react'

const Hero = () => {
  const scrollToProducts = () => {
    const element = document.getElementById('product_section');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="relative overflow-hidden">
        <section className='relative bg-gradient-to-br from-blue-50 via-white to-purple-50 px-6 py-20 text-center w-full'>
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
            </div>

            {/* Content */}
            <div className='relative z-10 max-w-5xl mx-auto space-y-10 px-6 sm:px-12 md:px-16 lg:px-24'>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">New Products Available</span>
                </div>

                {/* Main heading */}
                <h1 className='text-5xl font-extrabold text-gray-900 leading-tight md:text-6xl lg:text-7xl'>
                    Everything You Need,{' '}
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        All in One Place
                    </span>
                </h1>

                {/* Subtitle */}
                <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
                    Discover a curated collection of premium products designed to elevate your lifestyle. 
                    From everyday essentials to unique finds, we bring quality and convenience to your doorstep.
                </p>

                {/* CTA Button */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <button 
                        onClick={scrollToProducts}
                        className='group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-1'
                    >
                        <span>Shop Now</span>
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>

                    <button className='group inline-flex items-center gap-2 text-gray-700 text-lg font-medium px-8 py-4 rounded-2xl border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 cursor-pointer'>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Learn More</span>
                    </button>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap items-center justify-center gap-8 pt-8">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">10K+</div>
                        <div className="text-sm text-gray-600">Happy Customers</div>
                    </div>
                    <div className="w-px h-12 bg-gray-300 hidden sm:block"></div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">500+</div>
                        <div className="text-sm text-gray-600">Products</div>
                    </div>
                    <div className="w-px h-12 bg-gray-300 hidden sm:block"></div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">24/7</div>
                        <div className="text-sm text-gray-600">Support</div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Hero