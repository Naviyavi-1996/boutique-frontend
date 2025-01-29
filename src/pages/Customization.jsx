import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { addCustomizationapi } from '../services/allApi';
function Customization() {
     const [itemDetails,setitemDetails]=useState({
        category:"",
        description:"",
        color:"",
        size:"",
        noDatedelivery:"",
        phone:"",
        address:""
      })

      const send=async ()=>{
        const{category,description,size,color,noDatedelivery,phone,address}=itemDetails
        console.log(category,description,size,color,noDatedelivery,phone,address)
        if(!category || !description || !size || !color ||!noDatedelivery ||!address ||!phone)
            {
              toast.info("Please complete the form completely");
            }
            else if(!phone.match('^[0-9]{10}$'))
            {
              toast.warning("please Enter a valid phone number")
            }
            else{
                const price="pending"
                const  status='pending'
                const time=new Date()
                const orderdate= (time.toLocaleDateString('en-GB'))
                const remarks="order pending"
                if(sessionStorage.getItem("token"))
                {
                    const token=sessionStorage.getItem("token")
                    const reqHeader={
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    }
              const reqBody=new FormData()
              reqBody.append("category",category)
              reqBody.append("description",description)
              reqBody.append("price",price)
              reqBody.append("color",color)
              reqBody.append("size",size)
              reqBody.append("orderdate",orderdate)
              reqBody.append("status",status)
              reqBody.append("noDatedelivery",noDatedelivery)
              reqBody.append("remarks",remarks)
              reqBody.append("address",address)
              reqBody.append("phone",phone)
        const result=await addCustomizationapi(reqBody,reqHeader)
               console.log(result);
               if(result.status==200)
               {
                toast.success("Thank you ,request sended succesfully and  our team will contact on you");
                setTimeout(() => {
                  cancel()
                }, 2000)
               }
               else{
                toast.warning("Something went wrong")
               }
        
                }
                else{
                    toast.warning("Something went wrong ! check your login status")
                }
            }
      }
      const cancel=()=>{
        setitemDetails({
            category:"",
            description:"",
            color:"",
            size:"",
            noDatedelivery:"",
            phone:"",
            address:""
        })

      }
      useEffect(()=>{ window.scrollTo(0, 0);},[])
  return (
    <>
     <div className='container'>
      <Header/>
      <div className='row my-5 bg-success p-5 rounded'>
        <div className='col-md-6  '> 
            <img src="https://i.pinimg.com/originals/05/2c/bd/052cbdac905f0561e033c48cf2994ce3.gif" alt="no image" className='w-100' style={{height:'450px'}}/>
        </div>
        <div className='col-md-6 d-flex flex-column justify-content-center align-items-center'>
            <h4>Give Wings to your Ideas</h4>
        <input type="text"className='form-control mt-2' placeholder='Category like kurtha or gown etc' value={itemDetails.category} onChange={(e)=>{setitemDetails({...itemDetails,category:e.target.value})}} />
        <input type="text"className='form-control mt-2' placeholder='size' value={itemDetails.size} onChange={(e)=>{setitemDetails({...itemDetails,size:e.target.value})}}/>
        <input type="text"className='form-control mt-2' placeholder='color' value={itemDetails.color} onChange={(e)=>{setitemDetails({...itemDetails,color:e.target.value})}}/>
        <textarea type="text"className='form-control mt-2' placeholder='Description: material and other details' value={itemDetails.description} onChange={(e)=>{setitemDetails({...itemDetails,description:e.target.value})}}/>
        <input type="text" className='form-control mt-2'placeholder='Contact No:' value={itemDetails.phone} onChange={(e)=>{setitemDetails({...itemDetails,phone:e.target.value})}}/>
        <textarea type="text" className='form-control mt-2'placeholder='Address' value={itemDetails.address} onChange={(e)=>{setitemDetails({...itemDetails,address:e.target.value})}}/>
        <input type="text" className='form-control mt-2'placeholder='Expected no:of days for delivery' value={itemDetails.noDatedelivery} onChange={(e)=>{setitemDetails({...itemDetails,noDatedelivery:e.target.value})}}/>
        <div className='d-flex ms-auto'>
            <button className='btn btn-primary mt-4 me-3' onClick={send}>Send Request</button>
            <button className='btn btn-warning mt-4' onClick={cancel}>Cancel</button>
            </div>
        </div>
      </div>
       <ToastContainer theme='colored' position='top-center' autoClose={2000} />
      <Footer/>
 </div>
    </>
  )
}

export default Customization