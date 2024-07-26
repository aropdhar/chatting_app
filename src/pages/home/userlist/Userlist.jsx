import React, { useEffect, useState } from 'react'
import Heading from '../../../component/Heading'
import Image from '../../../component/image/Image'
import Paragraph from '../../../component/paragraph/Paragraph'
import { getDatabase, ref, set ,onValue, push } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'




const Userlist = () => {

    const db = getDatabase();
    const data = useSelector((state) => state.userstorage.value)
    console.log(data);
    const [alluser , setAlluser] = useState([]);
    const [freq , setFreq] = useState([])

// all user list

    useEffect(()=>{
        const userCountRef = ref(db, 'users');
            onValue(userCountRef, (snapshot) => {
            
                let arr = [];
              
                snapshot.forEach((item)=>{
                    if(item.key != data.uid){
                      arr.push({...item.val() , id: item.key})
                    }
                })
              
                setAlluser(arr);
        });
    }, [])

// friendrequest list 

useEffect(()=>{
    const freqCountRef = ref(db, 'friendreq');
        onValue(freqCountRef, (snapshot) => {
        
            let arr = [];
          
            snapshot.forEach((item)=>{
                if(data.uid == item.val().whosendid || data.uid == item.val().whoreceiveid){
                   arr.push(item.val().whosendid + item.val().whoreceiveid)
                }
            })
          
            setFreq(arr);
    });
}, [])




    let handleadd = (info) =>{
    
        set(push(ref(db, 'friendreq')), {
           whosendid: data.uid,
           whosendname: data.displayName,
           whosendemail: data.email,
           whoreceiveid: info.id,
           whoreceivename: info.DisplayName,
           whoreceiveemail: info.email,
        });
    }

  return (
    <>
      <div className='w-[420px] h-[84vh] p-[20px] rounded-[10px] bg-[#000]  ml-[10px]'>
         <Heading text="People you may know" textclass="text-[#fff] text-[20px] font-bold"/> 
         <div className='bg-[#42413f] overflow-scroll flex flex-col gap-y-[20px] p-[10px] rounded-[10px] mt-[20px] h-[70vh]'>
        {alluser.length > 0 ?
        alluser.map((item , index)=>(
            
            <div key={index}  className='flex items-center justify-between'>
                <div className='flex items-center gap-x-[12px]'>
                    <div className='bg-[#fff] w-[60px] h-[60px] overflow-hidden	rounded-[50%]'>
                        <Image alt="Not Found" className="w-[100%] h-[100%] object-cover"/>
                    </div>

                    <div className='flex flex-col gap-y-[5px]'>
                        <h4 className='text-[#fff] font-medium	'>{item.DisplayName}</h4>
                        <Paragraph paratext="Mern 2306" className="text-[#fff] font-medium"/>
                    </div>
                </div>
            {freq.includes(data.uid + item.id) || freq.includes(item.id + data.uid) 
            ?
             <div>
                <button className='bg-[blue] rounded-[10px] text-[#fff] px-[20px] font-semibold border-none py-[10px]'>Cancel</button>
             </div>
            
              :

                <div>
                    <button className='bg-[blue] rounded-[10px] text-[#fff] px-[20px] font-semibold border-none py-[10px]' onClick={()=>handleadd(item)}>Add Friend </button>
                </div>
            }

            </div>

        ))

        :

        <p className='text-[#000] p-[20px] rounded-[15px] mt-[165px] text-center text-[22px] bg-[skyblue]'>No Found users</p>

        }
            
         </div>
      </div>
    </>
  )
}

export default Userlist
