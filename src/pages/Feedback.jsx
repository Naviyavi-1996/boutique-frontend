import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { addFeedbackapi } from '../services/allApi'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Feedback() {
  const[feedback,setFeedback]=useState("")
  const user = JSON.parse(sessionStorage.getItem("existinguser"))
  const navigate=useNavigate()
  const sendFeedback=async()=>{
      const token=sessionStorage.getItem("token")
      const reqHeader={
         "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
      }
      const status="pending"
      const reqBody=new FormData()
      reqBody.append("feedback",feedback)
      reqBody.append("status",status)
        const result=await addFeedbackapi(reqBody,reqHeader)
        if(result.status==200)
        {
          toast.success("Thank you for your valuable feedback")
          setTimeout(() => {
            navigate('/shopping')
          }, 2000);

        }
       }
  
  return (
  <>
 <div className='container'v>
      <Header/>
      <div className='row my-5 bg-success p-5 rounded'>
        <div className='col-md-6  '> 
            <img src="https://cdn-icons-gif.flaticon.com/12134/12134186.gif" alt="no image" className='w-100'/>
        </div>
        <div className='col-md-6 d-flex flex-column justify-content-center align-items-center'>
            <h5>Hai <span className='text-warning'> {user.username}</span></h5>
           <textarea type="text"  className='form-control' placeholder='Share your Feedbacks Here !' onChange={(e)=>{setFeedback(e.target.value)}}/>
          <button className='btn btn-primary mt-4' onClick={sendFeedback}>Send</button>
        </div>
      </div>
       <ToastContainer theme='colored' position='top-center' autoClose={2000} />
      <Footer/>
 </div>
  </>
 
  )
}

export default Feedback