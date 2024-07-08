import React from 'react'
import Heading from '../../component/Heading'
import google from '../../assets/image 4.png'
import Image from '../../component/image/Image'
import Paragraph from '../../component/paragraph/Paragraph'
import Input from '../../component/input/Input'
import { NavLink } from 'react-router-dom'

const Login = () => {
  return (
    <>
      <div>
         <div className='flex flex-col gap-[20px] items-center justify-center w-[500px] rounded-[12px] m-auto mt-[80px] bg-[#eee] p-[20px]'>

            <div className='flex flex-col items-center gap-y-[20px]'>
               <Heading text="Login in or create an account to collaborate!" textclass="w-[371.79px] text-center m-auto text-[33.34px] font-bold"/>
               <div className='flex gap-[10px] items-center border-2 border-[#000] p-[15px] cursor-pointer rounded-[10px]'>
                  <Image src={google} alt="Not Found" className=""/>
                  <Paragraph paratext="Continue With Google"/>
               </div>
               <p>Or</p>
            </div>
            <div className='flex flex-col gap-[20px] '>
                <div>
                   <Input className="w-[350px] p-[12px] rounded-[12px] border-2 border-[#000]" type="email" placeholder="Enter Your Email"/>
                </div>
                <div>
                   <Input className="w-[350px] p-[12px] rounded-[12px] border-2 border-[#000]" type="email" placeholder="Enter Your Password"/>
                </div>
                <button type='Submit' className='bg-[#000] text-[#fff] text-[20px] rounded-[12px] font-bold p-[18px]'>Log In</button>
            </div>
            <div>
               <a href="#" className='inline-block ml-[220px] underline'>Reset Password?</a>
            </div>
             <p className='w-[220px] text-[16px]'>No Account?<NavLink to="/registration" className="ml-[10px] text-[blue] underline">Create Account</NavLink></p>
         </div>
      </div>
    </>
  )
}

export default Login
