import React, { useEffect, useState, useSyncExternalStore } from 'react'
import { addItemApi } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AddNewItem() {

  const [itemDetails,setitemDetails]=useState({
    category:"",
    description:"",
    price:"",
    color:"",
    dispatchTime:"",
    itemImage:"",

  })
  const[preview,setPreview]=useState("")
  const[token,setToken]=useState("")
  const[key,setkey]=useState(1)
  console.log(itemDetails);
  console.log(preview)
  console.log(token)
  useEffect(()=>{if(itemDetails.itemImage)
    {
      setPreview(URL.createObjectURL(itemDetails.itemImage))
    }
    },[itemDetails.itemImage])
  useEffect(()=>{
    window.scrollTo(0, 0);if(sessionStorage.getItem("token")){
    setToken(sessionStorage.getItem("token"))
  }},[])
  const cancel=()=>{
    setitemDetails({
      category:"",
      description:"",
      price:"",
      color:"",
      dispatchTime:"",
      itemImage:"",
    })
  
  setPreview("")
  if(key==1)
  {
    setkey(0)
  }
  else{
    setkey(1)
  }
}

  const additem=async()=>{
    const {category,description,price,color,itemImage}=itemDetails
    const dispatchTime="15-30 days after order placed"
    if(!category || !description || !price || !color || !dispatchTime || !itemImage)
    {
      toast.info("Please complete the form completely");
    }
    else 
    {
      const reqBody=new FormData()
      reqBody.append("category",category)
      reqBody.append("description",description)
      reqBody.append("price",price)
      reqBody.append("color",color)
      reqBody.append("dispatchTime",dispatchTime)
      reqBody.append("itemImage",itemImage)
     if(token)
     {
       const reqHeader ={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
       }
       const result=await addItemApi(reqBody,reqHeader)
       console.log(result);
       if(result.status==200)
       {
        toast.success("Item added succesfully");
        setTimeout(() => {
          cancel()
        }, 2000)
       }
       else if(result.status==406)
       {
        toast.warning(result.response.data)
        cancel()
       }
       else
       {
        toast.error("Something went wrong");
        cancel()
       }
     }
     else{
      toast.warning("Please Login");
     }
    }
  }
  return (
    <>
<div>
      <div className='row d-flex justify-content-center align-items-center bg-success p-5 shadow rounded'>
      <div className='col-md-6 '>
      
            <label htmlFor="itemImage">
              <input type="file"id='itemImage' style={{display:'none'}} key={key} onChange={(e)=>{setitemDetails({...itemDetails,itemImage:e.target.files[0]})}} />
              <img src={preview?preview:"https://cdn.dribbble.com/users/34020/screenshots/3993396/otp_icon_upload.gif"} alt="no image" className='w-100'/>
            </label>
        
      </div>
      <div className='col-md-6'>
       <div className='mt-2'> <input type="text" className='form-control' placeholder='Category'  value={itemDetails.category} onChange={(e)=>{setitemDetails({...itemDetails,category:e.target.value})}}/></div>
        <div className='mt-2'><textarea type="text" className='form-control' placeholder='Description' value={itemDetails.description} onChange={(e)=>{setitemDetails({...itemDetails,description:e.target.value})}}/></div>
        <input type="number" placeholder='price' className='form-control mt-2' value={itemDetails.price} onChange={(e)=>{setitemDetails({...itemDetails,price:e.target.value})}} />
       <input type="text" placeholder='color' className='form-control mt-2' value={itemDetails.color} onChange={(e)=>{setitemDetails({...itemDetails,color:e.target.value})}}/>
        <div className='d-flex justify-content-between mt-4'>
     <button className='btn btn-primary' onClick={additem}>Add New</button>
     <button className='btn btn-warning' onClick={cancel}>Cancel</button>
     
      </div>
      </div>
      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
</div>
    </>
  )
}

export default AddNewItem