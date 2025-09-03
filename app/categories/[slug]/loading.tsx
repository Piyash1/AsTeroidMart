import React from 'react'

const Loading = () => {
  return (
    <div className='main-max-width mx-auto padding-x py-9'>
      <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mx-auto" />

      <div className="flex-center flex-wrap my-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="cat-btn">
            <div className="w-[40px] h-[40px] bg-gray-200 rounded-full animate-pulse" />
            <div className="h-4 w-24 bg-gray-200 rounded mt-2 animate-pulse" />
          </div>
        ))}
      </div>

      <div className='flex-center flex-wrap my-6 gap-4'>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-[260px] rounded-lg shadow-md bg-white flex flex-col items-center gap-4 px-5 py-6">
            <div className="w-[200px] h-[200px] rounded-md bg-gray-200 animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Loading


