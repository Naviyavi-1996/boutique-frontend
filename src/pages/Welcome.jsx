import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import Adminheader from '../components/Adminheader';
import Footer from '../components/Footer';


function Welcome() {
   const[isAdmin,setIsAdmin]=useState()
   const user=JSON.parse(sessionStorage.getItem("existinguser"))
   
   useEffect(()=>{
    window.scrollTo(0, 0);
    if(user.username=='admin')
    {
      setIsAdmin(true)
    }
    else{
      setIsAdmin(false)
    }
   },[])
   

  return (   
<>
<div>
{isAdmin ? <Adminheader/>:
    <Header/>}
      <div className='row d-flex flex-column justify-content-center align-items-center' style={{ backgroundImage: 'url("https://png.pngtree.com/thumb_back/fw800/background/20240408/pngtree-clothing-store-in-shopping-mall-boutique-shop-interior-blur-defocused-background-image_15650934.jpg")',height:'100vh', backgroundRepeat: 'no-repeat',backgroundSize:'cover' }}>
      
     <div className='col-md-6'>
     <div className='d-flex flex-column justify-content-center align-items-center'>
             <h1 className='brand'><span style={{color:'rgb(252, 91, 118)' }}>She </span>Designs</h1>
             <h5 className='caption'>Style Your Moments</h5>
           
         </div>
     </div>
    </div>
</div>

      <Footer/>
</>
  )
}

export default Welcome