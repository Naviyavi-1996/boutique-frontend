import React, { useEffect, useState } from 'react'
import { getusernameApi } from '../services/allApi'
function Reviewcard({feedbacks}) {
 const id= feedbacks.userId
 const[user,setuser]=useState()
  const getusername=async()=>
  {
    const result=await getusernameApi(id)
    setuser(result.data)
  
  }
  useEffect(()=>{
   getusername()
  },[id])
  return (
    
      <div className='row w-100 bg-success p-2 rounded mt-1'>
        <div className='col-sm-6 p-2 d-flex flex-column justify-content-center align-items-center '>
            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/df7eac147767277.62c848d68fa9d.gif" alt="no image" className=' rounded shadow' style={{height:'150px', width:'100%'}}/>
            <h5>{user?.username}</h5>
        </div>
        <div className='col-sm-6 p-2'>
            <p style={{color:'black',textAlign:'justify'}}>{feedbacks?.feedback}</p>
        </div>
      </div>
     
   
  )
}

export default Reviewcard