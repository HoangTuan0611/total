import React from 'react'
const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white">
      {/* Logo */}
      <div className="flex items-center">
        <a href="/" className="text-2xl font-bold text-red-600">
          Iphone
        </a>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex space-x-8">
        <a href="#home" className="text-gray-700 hover:text-red-600">
          Home
        </a>
        <a href="#menu" className="text-gray-700 hover:text-red-600">
          Menu
        </a>
        <a href="#contact" className="text-gray-700 hover:text-red-600">
          Contact Us
        </a>
      </nav>

      {/* Icons (Search, Cart, Sign In) */}
      <div className="flex items-center space-x-6">
        <button className="text-gray-700 hover:text-red-600">
          <i className="fas fa-search"></i>
        </button>
        <button className="text-gray-700 hover:text-red-600 relative">
          <i className="fas fa-shopping-cart"></i>
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600"></span>
        </button>
        <button className="border border-gray-300 py-1 px-4 rounded-full text-gray-700 hover:text-red-600 hover:border-red-600">
          sign in
        </button>
      </div>
    </header>
  )
}

export default Header
