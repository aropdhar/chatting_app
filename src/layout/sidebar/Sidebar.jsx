import React from 'react'
import Heading from '../../component/Heading'
import Image from '../../component/image/Image'
import { CiHome, CiSettings } from 'react-icons/ci'
import Paragraph from '../../component/paragraph/Paragraph'
import { FaRocketchat } from 'react-icons/fa'
import { IoIosLogOut } from 'react-icons/io'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAuth, signOut } from "firebase/auth";
import { loginstorage } from '../../reduxslice/authslice'
import { AiFillWechat } from 'react-icons/ai'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Sidebar = () => {
  
  const navigate = useNavigate();
  const data = useSelector((state) => state?.userstorage?.value)
  const auth = getAuth();
  const dispatch = useDispatch()

  let handlelogout = () =>{

    signOut(auth).then(() => {

      navigate("/")
      localStorage.removeItem('localstorage')
      dispatch(loginstorage(null))

    }).catch((error) => {
      console.log("vul log out");
    });

  }
 
  return (
    <>
    <div className='p-[15px] pl-[15px]'>
      <div className='p-[20px] flex flex-col justify-between w-[200px] h-[96vh] bg-[#000] rounded-[12px]'>
        <div className='flex flex-col gap-[80px]'>
          <div className='flex items-center gap-[10px]'>
            <div className='bg-[#fff] w-[50px] h-[50px] rounded-[50%] overflow-hidden'>
                <Image src={data.photoURL} alt="not found" className="w-[100%] h-[100%] object-cover"/> 
            </div>
            <Heading text={
              data ?

              data.displayName
              :

              <Skeleton />
            } textclass="text-[#fff] text-[14px]"/>
          </div>
        <div className='flex flex-col gap-[40px]'>
           <div className='relative'>
              <NavLink to="/home" className=''>
                <p className='flex after:absolute after:content-[" "] after:left-[-20px] after:top-0 after:bg-[#fff] after:w-[10px]  after:h-[40px] after:rounded-[20px] transition duration-300 cursor-pointer items-center gap-[10px] text-[#fff]'><CiHome className='text-[36px] text-[#fff] '/> Home</p>
              </NavLink>
           </div>
           <div>
            <NavLink to="message">
                <p className='flex cursor-pointer items-center gap-[10px] text-[#fff]'><AiFillWechat className='text-[36px] text-[#fff]'/> Chats</p>
            </NavLink>
           </div>
           <div>
              <NavLink to="setting">  
                <p className='flex cursor-pointer items-center gap-[10px] text-[#fff]'><CiSettings className='text-[36px] text-[#fff]'/> Settings</p>
              </NavLink>
           </div>
        </div>
        </div>
        <div onClick={handlelogout}>
          <p className='flex items-center gap-[5px] cursor-pointer text-[25px] text-[#fff]'> <IoIosLogOut className='text-[36px]'/> Log Out</p>
        </div>
      </div>
    </div>

    
    </>
  )
}

export default Sidebar
