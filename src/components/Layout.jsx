import React from 'react'
import {Outlet} from 'react-router-dom'
import  Header from './Header'
import Footer from './Footer'

function Layout() {
  return (
    <div className='min-h-screen bg-peach'>
      <Header />
        {/* outlet renders the active childs */}
        <main className='container mx-auto '>
            <Outlet />
        </main>

        <Footer />
    </div>
  )
}

export default Layout