import React from 'react'
import Navbar from './navbar/Navbar'
import Sidebar from './sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const Rootlayout = () => {
  return (
    <>
    <div className='flex gap-[10px]'>
       <Sidebar/>
          <Outlet/>
       <Navbar/>
    </div>
    </>
  )
}

export default Rootlayout
