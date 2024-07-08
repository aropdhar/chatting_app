import React from 'react'
import Heading from '../../component/Heading'
import Image from '../../component/image/Image'
import { CiHome, CiSettings } from 'react-icons/ci'
import Paragraph from '../../component/paragraph/Paragraph'
import { FaRocketchat } from 'react-icons/fa'
import { IoIosLogOut } from 'react-icons/io'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <>
    <div className='p-[15px] pl-[15px]'>
      <div className='p-[20px] flex flex-col justify-between w-[200px] h-[96vh] bg-[blue] rounded-[12px]'>
        <div className='flex flex-col gap-[80px]'>
          <div className='flex items-center gap-[10px]'>
            <div className='bg-[#fff] w-[50px] h-[50px] rounded-[50%] overflow-hidden'>
                <Image alt="not found" className="w-[100%] h-[100%] object-cover"/> 
            </div>
            <Heading text="Arop Dhar" textclass="text-[#fff] text-[15px]"/>
          </div>
        <div className='flex flex-col gap-[40px]'>
           <div>
              <NavLink to="/home">
                <p className='flex cursor-pointer items-center gap-[10px] text-[#fff]'><CiHome className='text-[36px] text-[#fff]'/> Home</p>
              </NavLink>
           </div>
           <div>
            <NavLink to="message">
                <p className='flex cursor-pointer items-center gap-[10px] text-[#fff]'><FaRocketchat className='text-[36px] text-[#fff]'/> Chats</p>
            </NavLink>
           </div>
           <div>
              <NavLink to="setting">  
                <p className='flex cursor-pointer items-center gap-[10px] text-[#fff]'><CiSettings className='text-[36px] text-[#fff]'/> Settings</p>
              </NavLink>
           </div>
        </div>
        </div>
        <div>
          <p className='flex items-center gap-[5px] cursor-pointer text-[25px] text-[#fff]'> <IoIosLogOut className='text-[36px]'/> Log Out</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Sidebar
