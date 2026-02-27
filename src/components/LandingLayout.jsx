import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './landing/Navbar'
import Footer from './landing/Footer'

function LandingLayout() {
  return (
    <div className='min-h-screen font-poppins'>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default LandingLayout