import React from 'react'
import Heading from '../../../component/Heading'
import Paragraph from '../../../component/paragraph/Paragraph'
import Image from '../../../component/image/Image'

const Friendreq = () => {
  return (
    <>
   <div className='w-[520px] h-[84vh] p-[20px] rounded-[10px] bg-[#000]  ml-[10px]'>
         <Heading text="Friend Request" textclass="text-[#fff] text-[20px] font-bold"/> 
         <div className='bg-[#42413f] overflow-scroll flex flex-col gap-y-[20px] p-[10px] rounded-[10px] mt-[20px] h-[70vh]'>
        {[0,1].map((item , index)=>(
            
            <div key={index}  className='flex items-center justify-between'>
                <div className='flex items-center gap-x-[12px]'>
                    <div className='bg-[#fff] w-[60px] h-[60px] overflow-hidden	rounded-[50%]'>
                        <Image alt="Not Found" className="w-[100%] h-[100%] object-cover"/>
                    </div>

                    <div className='flex flex-col gap-y-[5px]'>
                        <h4 className='text-[#fff] font-medium	'>Arop Dhar</h4>
                        <Paragraph paratext="Mern 2306" className="text-[#fff] font-medium"/>
                    </div>
                </div>
            
                <div className='flex gap-x-[12px]'>
                    <button className='bg-[blue] rounded-[10px] text-[#fff] px-[20px] font-semibold border-none py-[10px]'>Confirm</button>
                    
                    <button className='bg-[#302727] rounded-[10px] text-[#fff] px-[20px] font-semibold border-none py-[10px]'>Delete</button>
                </div>

            </div>

        ))

        }
            
         </div>
      </div>
    </>
  )
}

export default Friendreq
