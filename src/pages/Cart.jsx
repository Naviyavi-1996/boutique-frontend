import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { addtoOrderapi, addtoWishlistapi, deleteCartApi, getCartApi, removeCartApi } from '../services/allApi';
import { serverUrl } from '../services/serverUrl';
import { faCartShopping, faHeart, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';



function Cart() {
   const[removeStatus,setRemoveStatus]=useState([])
   const[cart,setCart]=useState([])
   const[total,setTotal]=useState(0)
   const navigate=useNavigate()
     const [orderDetails,setorderDetails]=useState({
      phone:"",
      address:""
     })
   const getTotal=()=>
    {
      if(cart.length>0)
      {
        setTotal(cart?.map((item)=>item.price).reduce((n1,n2)=>n1+n2))
      }
     
    }
    const addwishlist=async(item)=>{
      const itemid=item?._id
           const size= item?.size;
           console.log(size,itemid)
             const reqBody=new FormData()
             reqBody.append("itemid",itemid)
             reqBody.append("size",size)
              reqBody.append("category",item?.category)
           reqBody.append("description",item?.description)
           reqBody.append("price",item?.price)
           reqBody.append("color",item?.color)
           reqBody.append("dispatchTime",item?.dispatchTime)
           reqBody.append("itemImage",item?.itemImage) 
     
             const token = sessionStorage.getItem("token")
               const reqHeader={
                 "Content-Type":"application/json",
                 "Authorization":`Bearer ${token}`
               }
               const result=await addtoWishlistapi(reqBody,reqHeader)
               console.log(result);
               if(result.status==200)
                 {
                removecartitem(item?._id)
                 }
                 else{
                   toast.error('something went wrong')
                 } 
           
         
        
       }
    const removecartitem=async(id)=>{
      console.log("hai")
      if(sessionStorage.getItem("token"))
        {
           const token=sessionStorage.getItem("token")
           const reqHeader={
              "Content-Type":"application/json",
              "Authorization":`Bearer ${token}`
              }    
              const result=await removeCartApi(id,reqHeader)
              console.log(result);
              if(result.status==200)
              {
                setRemoveStatus(result)
              }
              else
              {
                toast.warning("Something went wrong")
              }
    }
    }
      useEffect(()=>{
        window.scrollTo(0, 0);
        getCart()
      },[removeStatus])
      useEffect(() => {
        getTotal(); 
     }, [cart])
      const getCart=async()=>
      {
        if(sessionStorage.getItem("token"))
        {
           const token=sessionStorage.getItem("token")
           const reqHeader={
              "Content-Type":"application/json",
              "Authorization":`Bearer ${token}`
              }     
        
        const result=await getCartApi(reqHeader)
        setCart(result.data);
       }
      }
      
      const order=async(cart)=>{
        let status="Accepted"
        let remarks="no remarks"
        let ordersuccess=false
        const{phone,address}=orderDetails
        if(!phone || !address)
          { 
            toast.warning("please provide the contact number and address")
         }
         else if(! phone.match('^[0-9]{10}$'))
         {
          toast.warning("please provide valid contact number")
         }
     else{
     
      for(let i=0;i<cart?.length;i++)
        {
         const itemid=cart[i]?.itemid
         const size=cart[i]?.size
         const time= new Date
         const orderdate= (time.toLocaleDateString('en-GB'))
          const reqBody=new FormData()
          reqBody.append("itemid",itemid)
          reqBody.append("size",size)
           reqBody.append("orderdate",orderdate)
           reqBody.append("phone",phone)
           reqBody.append("address",address)
           reqBody.append("status",status)
           reqBody.append("remarks",remarks)
           const token = sessionStorage.getItem("token")
           const reqHeader={
             "Content-Type":"application/json",
             "Authorization":`Bearer ${token}`
           }
           const result=await addtoOrderapi(reqBody,reqHeader)
           console.log(result);
           if(result.status==200)
             {      
           ordersuccess=true
           setTimeout(() => {
             navigate('/myorders') 
          }, 3000)
         }
             else{
               toast.error('something went wrong')
             } 
        }   
     }
     if(ordersuccess==true)
   { 
    toast.success("Thank you for Choosing Us Your order Placed Succesffully Please check your phone for notifications because of COD ")
    const token=sessionStorage.getItem("token")
    const reqHeader={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
    const result=await deleteCartApi(reqHeader)
    getCart()
   }
  }
   const emptycart=async()=>{
    const token=sessionStorage.getItem("token")
    const reqHeader={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
   const result= deleteCartApi(reqHeader)
   toast.warning("cart cleared")
   setTimeout(() => {
    navigate('/shopping') 
 }, 3000)
   getCart()
   }   
  return (
     <>
             <Header/>
      <div className='container-fluid'>
      <h4 className='text-warning text-center mt-3'>Your Cart</h4>
     <div className='row my-5 w-100 '>
    
     {cart.length>0? (
     <div className='d-flex'>
       <div className='me-2 table table-responsive'  style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <table className="table table-striped table-success mt-1 border rounded">
                      <thead>
                        <tr>
                          <th>SI.NO</th>
                          <th>Image</th>
                          <th>category</th>
                          <th>decription</th>
                          <th>color</th>
                          <th>selected size</th>
                          <th>Dispatch Time</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                         {cart?.map((item,index)=>(<tr>
                                              <td>{index+1}</td>
                                              <td>
                                                <img
                                                  src= {`${serverUrl}/upload/${item?.itemImage}`}
                                                  alt="dress image"
                                                  style={{ height: '100px', width: '100px', objectFit: 'cover' }}
                                                />
                                              </td>
                                              <td>{item?.category}</td>
                                              <td>{item?.description}</td>
                                              <td>{item?.color}</td>
                                              <td>{item?.size}</td>
                                              <td>{item?.dispatchTime}</td>
                                              <td>
                                                <div className='d-flex justify-content-between'>
                                                <button className='btn btn-danger me-2' onClick={()=>{removecartitem(item?._id)}}><div className='d-flex'><FontAwesomeIcon icon={faMinus}/><FontAwesomeIcon icon={faCartShopping} /></div></button>
                                                <button className='btn btn-primary me-2'  onClick={()=>{addwishlist(item)}}><div className='d-flex'><FontAwesomeIcon icon={faPlus}/><FontAwesomeIcon icon={faHeart} /></div></button>
                                                </div> 
                                              </td>
                                            </tr>)) }
                                          </tbody>
                                </table>
                                </div>
                                <div className='col-md-3 bg-primary rounded mt-2'>
                                <h4 className='text-center'>Cart Summary</h4>
                                <hr style={{color:'white'}}/>
                                   <div className='row'>
                                       <div className='col-md-12'>
                                           <p className='text-light'>Total number of products:{cart?.length}</p>
                                           <p className='text-light'>Total Amount:{total}</p>
                                           <p className='text-light'>Shipping Charge:₹200</p>
                                           <p className='text-light'>Grand Total:{total+100}</p>
                                       </div>
                                       <hr style={{color:'white'}}/>
                                   </div>
                                   <div className='d-flex justify-content-center align-items-center flex-column'>
                                     <input type="text"  className='form-control mb-2' placeholder='Contact Number'onChange={(e)=>{setorderDetails({...orderDetails,phone:e.target.value})}}/>
                                    <textarea name="" id="" className='form-control mb-2' placeholder='Address' onChange={(e)=>{setorderDetails({...orderDetails,address:e.target.value})}}></textarea>
                                    <div className='d-flex'>
                                      <button className='btn btn-success'onClick={()=>order(cart)}>Place Order</button>
                                      <button className='btn btn-danger'onClick={emptycart}>Empty Cart</button>
                                      </div>
                                   </div>
                               </div>
     </div>):
          <div className='d-flex justify-content-center align-items-center'> <img className="w-75" style={{height:'500px'}}src="https://assets-v2.lottiefiles.com/a/09823a3e-117d-11ee-aa74-87493bf51c06/rEfI5zOX3n.gif" alt="no items in cart" /></div>}
         </div>
      </div>
     <ToastContainer theme='colored' position='top-center' autoClose={2000} />
      <Footer/>
     </>
  )
}

export default Cart