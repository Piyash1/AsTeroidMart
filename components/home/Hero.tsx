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
    <div>
        <section className='bg-gray-200 px-6 py-16 text-center w-full'>
            <div className='max-w-4xl mx-auto space-y-8 px-6 sm:px-12 md:px-16 lg:px-24'>
                <h1 className='text-4xl font-extrabold text-gray-900 leading-snug md:text-5xl'>
                    Everything You Need, All in One Place
                </h1>
                <p className='text-lg text-gray-700 max-w-2xl mx-auto'>
                    Explore a wide range of premium products crafted to make every day easier and more enjoyable.
                </p>
                <button 
                    onClick={scrollToProducts}
                    className='inline-block bg-black text-white text-lg font-semibold px-8 py-3 rounded-xl shadow-lg hover:bg-gray-900 transition-all duration-300 cursor-pointer'
                >
                    Shop Now
                </button>
            </div>
        </section>
    </div>
  )
}

export default Hero