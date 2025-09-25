import React from 'react'

const Header = () => {
  return (
    <div className='flex items-center justify-between py-4 px-8 shadow-md'>
        <h2 className='primaryFont text-lg font-bold'>Meal Planner</h2>
        <button className='bg-purple-500 text-white px-4 py-2 rounded-md secondaryFont'>
          Get Started</button>
    </div>
  )
}

export default Header