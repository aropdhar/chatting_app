import React from 'react'
import Heading from '../../component/Heading'
import { IoIosNotificationsOutline } from 'react-icons/io'
import Image from '../../component/image/Image'
import { useSelector, useDispatch } from 'react-redux'

const Navbar = () => {

  const data = useSelector((state) => state.userstorage.value);

  return (
    <>
      <div className='bg-[#000] absolute top-[2%] right-[5%] left-[16%] w-[82%] h-[10%] py-[10px] px-[20px] rounded-[10px]'>
         <div className='flex items-center justify-between'>
             <Heading text="Chats" textclass="text-[#fff] text-[32px]"/>
             <div className='flex items-center gap-[30px]'>
                <IoIosNotificationsOutline className='text-[#fff] text-[40px] cursor-pointer'/>
                <div className='flex items-center gap-[10px]'>
                    <div className='bg-[#fff] w-[45px] h-[45px] overflow-hidden	rounded-[50%]'>
                      <Image src={data.photoURL} alt="Not Found" className="w-[100%] h-[100%] object-cover"/>
                    </div>
                    <p className='text-[#fff]'>{data.displayName}</p>
                </div>
             </div>
         </div>
      </div>
    </>
  )
}

export default Navbar
