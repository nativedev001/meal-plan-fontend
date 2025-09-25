import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-gray-600 py-4 px-6 mt-8">
      <div className="max-w-7xl mx-auto text-center secondaryFont text-sm">
        © {year} Meal Planner. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
