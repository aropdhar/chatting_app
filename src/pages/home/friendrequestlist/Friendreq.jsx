import React, { useEffect, useState } from 'react'
import Heading from '../../../component/Heading'
import Paragraph from '../../../component/paragraph/Paragraph'
import Image from '../../../component/image/Image'
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";

const Friendreq = () => {
  
    const db = getDatabase();
    const [frndreq , setFrndreq ] = useState([]);
    const data = useSelector((state) => state.userstorage.value)

    useEffect(()=>{ 
        const fndCountRef = ref(db, 'friendreq');
            onValue(fndCountRef, (snapshot) => {
            
                let arr = [];

                snapshot.forEach((item)=>{
                    if(data.uid == item.val().whoreceiveid){
                        arr.push({...item.val() , id: item.key})
                    }
                })
            
                setFrndreq(arr)
        });
    }, [])

    let handledelete = (deleteinfo) =>{
      
        remove(ref(db, 'friendreq/' + deleteinfo.id))

    }

    let handleconfirm = (confirminfo) =>{
       
        set(push(ref(db, 'friends')), {
            senderid: confirminfo.whosendid,
            sendername: confirminfo.whosendname,
            senderemail: confirminfo.whosendemail,
            receiveid: data.uid,
            receivename: data.displayName,
            receiveemail: data.email,
          });

    }

  return (
    <>
   <div className='w-[520px] h-[84vh] p-[20px] rounded-[10px] bg-[#000]  ml-[10px]'>
         <Heading text="Friend Request" textclass="text-[#fff] text-[20px] font-bold"/> 
         <div className='bg-[#42413f] overflow-scroll flex flex-col gap-y-[20px] p-[10px] rounded-[10px] mt-[20px] h-[70vh]'>
        {frndreq.length > 0 ?
        
        frndreq.map((item , index)=>(
            
            <div key={index}  className='flex items-center justify-between'>
                <div className='flex items-center gap-x-[12px]'>
                    <div className='bg-[#fff] w-[60px] h-[60px] overflow-hidden	rounded-[50%]'>
                        <Image alt="Not Found" className="w-[100%] h-[100%] object-cover"/>
                    </div>

                    <div className='flex flex-col gap-y-[5px]'>
                        <h4 className='text-[#fff] font-medium	'>{item.whosendname}</h4>
                        <Paragraph paratext="Mern 2306" className="text-[#fff] font-medium"/>
                    </div>
                </div>
            
                <div className='flex gap-x-[12px]'>
                    <button className='bg-[blue] rounded-[10px] text-[#fff] px-[20px] font-semibold border-none py-[10px]' onClick={()=>handleconfirm(item)}>Confirm</button>
                    
                    <button className='bg-[#302727] rounded-[10px] text-[#fff] px-[20px] font-semibold border-none py-[10px]' onClick={()=>handledelete(item)}>Delete</button>
                </div>

            </div>

        ))

        :

         <p className='text-[#000] p-[20px] rounded-[15px] mt-[165px] text-center text-[22px] bg-[skyblue]'>No Found Friend Request</p>

        }
            
         </div>
      </div>
    </>
  )
}

export default Friendreq
