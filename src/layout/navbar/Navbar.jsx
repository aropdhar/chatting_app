import React, { useState } from 'react'
import Heading from '../../component/Heading'
import { IoIosNotificationsOutline, IoMdClose } from 'react-icons/io'
import Image from '../../component/image/Image'
import { useSelector, useDispatch } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Paragraph from '../../component/paragraph/Paragraph'

const Navbar = () => {

  const data = useSelector((state) => state.userstorage.value);
  const [notishow , setNotishow] = useState(false);

  return (
    <>
      <div className='bg-[#000] absolute top-[2%] right-[5%] left-[16%] w-[82%] h-[10%] py-[10px] px-[20px] rounded-[10px]'>
         <div className='flex items-center relative justify-between'>
             <Heading text="Chats" textclass="text-[#fff] text-[32px]"/>
             <div className='flex items-center gap-[30px]'>
                <IoIosNotificationsOutline onClick={()=>setNotishow(true)} className='text-[#fff] hover:bg-notibg hover:rounded-[50%] text-[40px] cursor-pointer'/>
                <div className='flex items-center gap-[10px]'>
                    <div className='bg-[#fff] w-[45px] h-[45px] overflow-hidden	rounded-[50%]'>
                      <Image src={data.photoURL} alt="Not Found" className="w-[100%] h-[100%] object-cover"/>
                    </div>
                    <p className='text-[#fff]'>{data.displayName}</p>
                </div>
             </div>
         </div>
      </div>

      {/* notification site */}
       {notishow &&

        <div className='w-[420px] h-[84vh] p-[20px] absolute right-[32px] top-[100px] rounded-[10px] bg-[#000]  ml-[10px]'>
          <Heading text="Notification" textclass="text-[#fff] text-[20px] font-bold"/> 
          <IoMdClose onClick={()=>setNotishow(false)} className=' absolute right-[20px] top-[20px] text-[#fff] text-[35px] cursor-pointer font-bold'/>
          <div className='bg-[#42413f] overflow-scroll flex flex-col gap-y-[20px] p-[10px] rounded-[10px] mt-[20px] h-[70vh]'>
  
              <h1 className='text-[#fff]'>Arop Dhar</h1>
              
          </div>
        </div>
       }
    </>
  )
}

export default Navbar
