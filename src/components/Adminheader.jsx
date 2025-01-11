import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '/src/images/logo.png'
import { addItemApi } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginResponseContext } from '../context/Contextshare';
import { addResponseContext } from '../context/Contextshare';
function Adminheader() {
    const[isadd,setIsAdd]=useState(false)
    const{setLoginResponse}=useContext(loginResponseContext)
     const { setAddResponse } = useContext(addResponseContext);
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
      const navigate=useNavigate()
        const logout=()=>{
          sessionStorage.removeItem('existinguser')
          sessionStorage.removeItem('token')
          setLoginResponse(false)
          navigate('/')
        }
      console.log(itemDetails);
      console.log(preview)
      console.log(token)
      useEffect(()=>{if(itemDetails.itemImage)
        {
          setPreview(URL.createObjectURL(itemDetails.itemImage))
        }
        },[itemDetails.itemImage])
      useEffect(()=>{if(sessionStorage.getItem("token")){
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
        if (itemImage && (itemImage.type === 'image/jpeg' || itemImage.type === 'image/png' || itemImage.type === 'image/jpg')) 
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
              setAddResponse(result)
              cancel()
              setIsAdd(false)
            }, 2000)
            
           }
           else if(result.status==406)
           {
            toast.warning(result.response.data)
            setTimeout(() => {
              cancel()
              setIsAdd(false)
            }, 2000)
           }
           else
           {
            toast.error("Something went wrong");
            setTimeout(() => {
              cancel()
              setIsAdd(false)
            }, 2000)
           }
         }
         else{
          toast.warning("Please Login");
          setTimeout(() => {
            cancel()
            setIsAdd(false)
          }, 2000)
         }
        }
        else 
        {
          toast.warning("only png ,jpeg and jpg format supported for image")
          setTimeout(() => {
            cancel()
            setIsAdd(false)
          }, 2000)
        }
      }
       function add()
       {
        if(!isadd)
        {
           setIsAdd(true) 
        }
        else{
           setIsAdd(false)
        }
       }


  return (
    <>
    <Navbar expand="lg" style={{backgroundColor:'rgb(252, 91, 118)'}}>
      <Container>
        <Navbar.Brand href="#home"><img src={logo}alt="no image" style={{height:'100px',width:'100px'}}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <Link to={'/'}> <Nav.Link href="#home"><button className='btn rounded border-0'style={{color:'black'}}>Home</button></Nav.Link></Link>
          <Nav.Link href="#home"><button className='btn rounded border-0'style={{color:'black'}} onClick={add}>New Item</button></Nav.Link>
         <Link to={'/viewfeedback'}> <Nav.Link href="#home"><button className='btn rounded border-0'style={{color:'black'}}>Feedbacks</button></Nav.Link></Link>
         <Link to={'/viewnormalorders'}> <Nav.Link href="#home"><button className='btn rounded border-0'style={{color:'black'}}>Orders</button></Nav.Link></Link>
         <Link to={'/viewcustomorders'}> <Nav.Link href="#home"><button className='btn rounded border-0'style={{color:'black'}}>Customization Requests</button></Nav.Link></Link>
         <Link to={'/viewusers'}> <Nav.Link href="#home"><button className='btn rounded border-0'style={{color:'black'}}>Users</button></Nav.Link></Link>
         <Link to={'/viewdesigns'}> <Nav.Link href="#home"><button className='btn rounded border-0'style={{color:'black'}}>Designs</button></Nav.Link></Link>
            <Nav.Link href="#home"><button className='btn btn-outline-dark rounded shadow' onClick={logout} style={{color:'black',borderColor:"black"}}>LOG OUT</button></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

<div style={{backgroundColor:'rgb(252, 91, 118)'}}>
        <div className='container' >
            <div className='row'>
            {isadd && <div className='col-md-12'>
             { <div>
                   <div className='row d-flex justify-content-center align-items-center bg-success p-5 shadow rounded'>
                   <div className='col-md-6 '>
                   
                         <label htmlFor="itemImage">
                           <input type="file"id='itemImage' style={{display:'none'}} key={key} onChange={(e)=>{setitemDetails({...itemDetails,itemImage:e.target.files[0]})}} />
                           <img src={preview?preview:"https://cdn.dribbble.com/users/34020/screenshots/3993396/otp_icon_upload.gif"} alt="no image" className='w-100' style={{height:'300px'}}/>
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
             </div>}
             </div>}
             </div>
        </div>
</div>
    </>
  )
}

export default Adminheader