import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { loginApi, registerApi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginResponseContext } from '../context/Contextshare'
function Login({register}) {
  
  const{setLoginResponse}=useContext(loginResponseContext)
  const navigate=useNavigate()
  const [userDetails,setUserDetails]=useState({
    username:"",
    email:"",
    phone:"",
    password:"" 
  })
  console.log(userDetails);
  const handleRegister=async()=>{
   
  const{username,email,password}=userDetails  
   
   
   if(!username || !email || !password)
    {
    toast.info("Please fill the form completely")
    }
    else if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      toast.warning("Mail ID not valid");
  }
    else{
     
       const result = await registerApi(userDetails)
       console.log(result);
       if(result.status==200)
       {
        toast.success("Registration Successfull")
        setUserDetails({
          username:"",
          email:"",
          password:"" ,
        })
        navigate('/login')
       }
       else if(result.status==406)
       {
        toast.warning(result.response.data)
       }else{
        toast.error("Something went wrong")
       }
    }
  }
  const handleLogin=async()=>{
    const{email,password}=userDetails
    if(!email || !password)
    {
    toast.info("Please fill the form completely")
    }
    else{
      const result=await loginApi({email,password})
      console.log(result);
      if(result.status==200)
      {
        toast.success("Login successfull");
        sessionStorage.setItem("existinguser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)
        setLoginResponse(true)
        console.log()
        setUserDetails({
          username:"",
          email:"",
          password:"" 
        })
        setTimeout(() => {
          navigate('/welcome')
        }, 2000)
      }
      else if(result.status==406)
      {
        toast.warning(result.response.data);
        setUserDetails({
          username:"",
          email:"",
          password:"" 
        })
      }
      else{
        toast.error("incorrect emailid or password");
        setUserDetails({
          username:"",
          email:"",
          password:"" 
        })
      }
    }
    }
    const handleKeyPressregister = (event) => {
      // If Enter key (keyCode 13) is pressed, trigger the login
      if (event.key === "Enter") {
        handleRegister();
      }
  }
  const handleKeyPresslogin = (event) => {
    // If Enter key (keyCode 13) is pressed, trigger the login
    if (event.key === "Enter") {
      handleLogin();
    }
}
useEffect(()=>{ window.scrollTo(0, 0);},[])
  return (
   <>
   
   <div className='container mt-5 mb-5'>
       <div className='row bg-success mt-3' >
        <div className='col-md-6 d-flex justify-content-center align-items-center' style={{backgroundColor:'rgb(252, 91, 118)'}}>
          <img src='https://t4.ftcdn.net/jpg/03/39/50/99/360_F_339509959_SXyYbnK2ek2s0QFt0hKS6N4FODJ986eR.jpg' alt="no image" className='w-100' style={{height:'520px'}} />
        </div>
        <div className='col-md-6 d-flex justify-content-center align-items-center flex-column bg-dark'>
        <h3 className='brand mt-5'><span style={{color: 'rgb(252, 91, 118)'}}>She</span> Designs</h3> 
        <h5 className='caption'>Style your Moments</h5>
        {!register? <h4  className='text-light'>Sign In to Your Account</h4> :
        <h4  className='text-light'>Sign Up to Your Account</h4>}
       { register ? <div class="w-75"> <input type="text" className='w-100 form-control rounded-0 mt-5' placeholder='Username' value={userDetails.username}  onChange={(e)=>{setUserDetails({...userDetails,username:e.target.value})}} />
        <input type="email" className='w-100 form-control mb-2 rounded-0 mt-3'placeholder='Email ID' value={userDetails.email}  onChange={(e)=>{setUserDetails({...userDetails,email:e.target.value})}}/>
        <input type="password" className='w-100 form-control mt-3 rounded-0'placeholder='Password' value={userDetails.password} onKeyDown={handleKeyPressregister}  onChange={(e)=>{setUserDetails({...userDetails,password:e.target.value})}}/></div>
        :
       <div class="w-75"> <input type="email" className='w-100 form-control mb-2 rounded-0 mt-3'placeholder='Email ID'value={userDetails.email}  onChange={(e)=>{setUserDetails({...userDetails,email:e.target.value})}}/>
        <input type="password" className='w-100 form-control mt-4 rounded-0'placeholder='Password'value={userDetails.password} onKeyDown={handleKeyPresslogin}  onChange={(e)=>{setUserDetails({...userDetails,password:e.target.value})}}/></div>}

       
       {!register ? <div className='w-75 mt-2'>
        <button className='btn btn-success w-100 mt-3 ' onClick={handleLogin}>Login</button>
                <p className='text-light text-start'>
                    New User? click Here to <Link to='/register' className='text-danger'> Register</Link>
                </p>
            </div>:
            <div className='w-75 mt-2'>
        <button className='btn btn-success w-100 mt-3' onClick={handleRegister}>Register</button>
                <p className='text-light text-start'>
                   Already a User? click Here to <Link to='/login' className='text-danger'> Login</Link>
                </p>
            </div>}
        </div>
       </div>
      </div>
      <Footer/>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
   </>
  )
}

export default Login