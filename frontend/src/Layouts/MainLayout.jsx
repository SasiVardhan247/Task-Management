import React from 'react'
import Header from '../Components/Navbar';

const MainLayout = ({ children }) => {
  return (
    <>
      <div className='relative bg-gray-50 h-screen w-screen overflow-x-hidden'>
        <Header />
        {children}
      </div>
    </>
  )
}

export default MainLayout;