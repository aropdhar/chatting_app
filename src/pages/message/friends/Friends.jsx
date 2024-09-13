import React, { useEffect, useState } from 'react'
import Heading from '../../../component/Heading'
import Image from '../../../component/image/Image'
import Paragraph from '../../../component/paragraph/Paragraph'
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { useractivedata } from '../../../reduxslice/activedata'

const Friends = () => {
    const db = getDatabase();
    const dispatch = useDispatch()
    const [frnd , setFrnd ] = useState([]);
    const data = useSelector((state) => state.userstorage.value)
    const activedata = useSelector((state) => state.activedatamessage.value)
    

    useEffect(()=>{ 
        const fndCountRef = ref(db, 'friends');
            onValue(fndCountRef, (snapshot) => {
            
                let arr = [];

                snapshot.forEach((item)=>{
                    if(data.uid == item.val().senderid || data.uid == item.val().receiveid){
                        arr.push({...item.val() , id: item.key})
                    }
                })
            
                setFrnd(arr)
        });
    }, [])

    const handlemessage = (frndinfo) =>{
        dispatch(useractivedata(frndinfo))
    }

  return (
    <>
      <div className='w-[420px] h-[84vh] p-[20px] rounded-[10px] bg-[#23252f]  ml-[10px]'>
         <Heading text="Friends" textclass="text-[#fff] text-[20px] font-bold"/> 
         <div className='bg-[#3b3e46] overflow-scroll flex flex-col gap-y-[20px] p-[10px] rounded-[10px] mt-[20px] h-[70vh]'>
        {frnd.length > 0 ?

        frnd.map((item , index)=>(
            
         <div key={index} onClick={()=>handlemessage(item)}  className='flex items-center justify-between p-[10px] rounded-[10px] cursor-pointer hover:bg-frndbg'>
                <div className='flex items-center gap-x-[12px]'>
                    <div className='bg-[#fff] w-[60px] h-[60px] overflow-hidden	rounded-[50%]'>
                        <Image alt="Not Found" className="w-[100%] h-[100%] object-cover"/>
                    </div>

                    <div className='flex flex-col gap-y-[5px]'>
                        <h4 className='text-[#fff] font-medium	'>
                        {data.uid == item.receiveid ?

                          item.sendername

                          :

                          item.receivename

                        }</h4>
                        <Paragraph paratext="Mern 2306" className="text-[#fff] font-medium"/>
                    </div>
                </div>


                <div>
                    <button className='bg-[blue] rounded-[10px] text-[#fff] px-[20px] font-semibold border-none py-[10px]'>Block</button>
                </div>

            </div>

        ))

        :

        <p className='text-[#000] p-[20px] rounded-[15px] mt-[165px] text-center text-[22px] bg-[skyblue]'>No Found Friends</p>

        }
            
         </div>
      </div>
    </>
  )
}

export default Friends
