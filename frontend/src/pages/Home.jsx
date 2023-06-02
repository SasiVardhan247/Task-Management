import React from 'react'
import Tasks from '../Components/Tasks';
import MainLayout from '../Layouts/MainLayout';

const Home = () => {

  return (
      <MainLayout>
        <h1 className='text-lg mt-8 mx-8 border-b border-b-gray-300'>Welcome to Sasi's Task Manager App</h1>
        <Tasks />
      </MainLayout>
  )
}

export default Home