import React from 'react'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

const SectionHeader = ({ title, subtitle, className = "" }: SectionHeaderProps) => {
  return (
    <div className={`text-center mb-16 ${className}`}>
      {/* Decorative Line */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        <div className="mx-4 w-2 h-2 bg-blue-500 rounded-full"></div>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      </div>

      {/* Main Title */}
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative">
        <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-gray-900 bg-clip-text text-transparent">
          {title}
        </span>
        
        {/* Decorative Elements */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-100 rounded-full opacity-60"></div>
        <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-purple-100 rounded-full opacity-60"></div>
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Bottom Decorative Line */}
      <div className="flex items-center justify-center mt-8">
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        <div className="mx-6 w-1 h-1 bg-purple-500 rounded-full"></div>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      </div>
    </div>
  )
}

export default SectionHeader
