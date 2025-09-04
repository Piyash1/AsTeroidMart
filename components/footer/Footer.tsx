import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaLinkedin, FaFacebookF, FaYoutube, FaInstagram, FaTwitter, FaTiktok, FaPinterest } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white w-full">
      {/* Main Footer Content */}
      <div className="main-max-width mx-auto padding-x py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.png"
                  alt="AsteroidMart Logo"
                  fill
                  className="object-contain"
                  unoptimized={true}
                />
              </div>
              <h1 className="text-2xl font-bold text-white">AsteroidMart</h1>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Your premier destination for quality products. We make online shopping 
              seamless and enjoyable with fast delivery and excellent customer service.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <MdEmail className="text-blue-500" />
                <span className="text-sm">asteroidexo@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MdPhone className="text-blue-500" />
                <span className="text-sm">+880 1798 772429</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MdLocationOn className="text-blue-500" />
                <span className="text-sm">Mirpur, Dhaka</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#product_section" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Featured Products
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Search Products
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-400 hover:text-white transition-colors duration-200">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:support@asteroidmart.com" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="tel:+15551234567" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Call Us
                </a>
              </li>
              <li>
                <Link href="/profile" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/success" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Order Success
                </Link>
              </li>
              <li>
                <span className="text-gray-400 cursor-default">
                  Shipping & Returns
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Stay Connected</h3>
            <p className="text-gray-400 mb-4 text-sm">
              Subscribe to our newsletter for exclusive deals and updates.
            </p>
            
            {/* Newsletter Signup */}
            <div className="mb-6">
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <button className="w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h4 className="text-sm font-medium mb-3 text-white">Follow Us</h4>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/moniruzzaman.piyash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-200 group"
                >
                  <FaFacebookF className="text-gray-400 group-hover:text-white" />
                </a>
                <a
                  href="https://x.com/AsT3RoidOP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-black rounded-lg flex items-center justify-center transition-all duration-200 group"
                >
                  <BsTwitterX className="text-gray-400 group-hover:text-white" />
                </a>
                <a
                  href="https://www.instagram.com/bigsecret_6_9/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all duration-200 group"
                >
                  <FaInstagram className="text-gray-400 group-hover:text-white" />
                </a>
                <a
                  href="https://www.youtube.com/@ast3eroidplays"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all duration-200 group"
                >
                  <FaYoutube className="text-gray-400 group-hover:text-white" />
                </a>
                <a
                  href="https://www.linkedin.com/in/moniruzzamanpiyash/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all duration-200 group"
                >
                  <FaLinkedin className="text-gray-400 group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="main-max-width mx-auto padding-x py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2025 AsteroidMart. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <span className="text-gray-400 cursor-default">
                Privacy Policy
              </span>
              <span className="text-gray-400 cursor-default">
                Terms of Service
              </span>
              <span className="text-gray-400 cursor-default">
                Cookie Policy
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

