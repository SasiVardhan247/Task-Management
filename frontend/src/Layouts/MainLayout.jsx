import React from 'react'
import Navbar from '../Components/Navbar';

const MainLayout = ({ children }) => {
  return (
    <>
      <div className='relative bg-cyan-50 h-screen w-screen overflow-x-hidden'>
        <Navbar />
        {children}
      </div>
    </>
  )
}

export default MainLayout;