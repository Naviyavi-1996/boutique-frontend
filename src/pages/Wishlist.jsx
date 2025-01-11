import React, { useEffect, useState } from 'react'

import Header from '../components/Header';
import Footer from '../components/Footer';

import { addtoCartapi, getWishlistApi, removeWishlistApi } from '../services/allApi';

import { serverUrl } from '../services/serverUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Wishlist() {
  const[removeStatus,setRemoveStatus]=useState([])
  const addcart=async(item)=>{
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
             const result=await addtoCartapi(reqBody,reqHeader)
             console.log(result);
             if(result.status==200)
               {
                 toast.success('added to cart successfully')
             setTimeout(() => {
              removeWishlistitem(item?._id)
              setRemoveStatus(result)
             }, 2000)
               }
               else{
                 toast.error('something went wrong')
               } 
         
       
      
     }
  const removeWishlistitem=async(id)=>{
    if(sessionStorage.getItem("token"))
      {
         const token=sessionStorage.getItem("token")
         const reqHeader={
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
            }    
            const result=await removeWishlistApi(id,reqHeader)
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
  const[wishlist,setwishlist]=useState([])
    useEffect(()=>{
      getWishlist()
    },[removeStatus])
    const getWishlist=async()=>
    {
      if(sessionStorage.getItem("token"))
      {
         const token=sessionStorage.getItem("token")
         const reqHeader={
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
            }     
      
      const result=await getWishlistApi(reqHeader)
      setwishlist(result.data);
     }
    }
  return (
     <>
     <Header/>
     <div className='container-fluid'>
      <h4 className='text-warning text-center mt-3'>Your Wishlist</h4>
     <div className='row my-3 table table-responsive'  style={{ maxHeight: '400px', overflowY: 'auto' }}>
    {wishlist.length>0? (<table className="table table-striped table-success mt-3">
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
                   {wishlist?.map((item,index)=>(<tr>
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
                        <button className='btn btn-danger me-2' onClick={()=>{removeWishlistitem(item?._id)}}><div className='d-flex'><FontAwesomeIcon icon={faMinus}/><FontAwesomeIcon icon={faHeart} /></div></button>
                        <button className='btn btn-primary'  onClick={()=>{addcart(item)}}><div className='d-flex'><FontAwesomeIcon icon={faPlus}/><FontAwesomeIcon icon={faCartShopping} /></div></button>
                        </div>
                      </td>
                    </tr>)) }
                  </tbody>
                 
        </table>): 
          <h4 className='text-center text-warning mt-5'>Empty wishlist</h4>
        }    
       </div>
     </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
  <Footer/>
   </>
  )
}

export default Wishlist