
import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

//register
export const registerApi=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/register`,reqBody,"")
}
//login
export const loginApi=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqBody,"")
}
//add item

export const addItemApi=async(reqBody,reqHeader)=>
    {
        return await commonApi('POST',`${serverUrl}/add-item`,reqBody,reqHeader)
    }

    //get home items
export const homeItemApi=async()=>
    {
        return await commonApi('GET',`${serverUrl}/home-item`)
    }
        //get all items
export const allItemApi=async(searchKey,reqHeader)=>
    {
        return await commonApi('GET',`${serverUrl}/all-item?search=${searchKey}`,"",reqHeader)
    }
    
    //add to wishlist
    export const addtoWishlistapi=async(reqBody,reqHeader)=>{
       
        return await commonApi('POST',`${serverUrl}/add-wishlist`,reqBody,reqHeader)
    }
    //add to cart
    export const addtoCartapi=async(reqBody,reqHeader)=>{
      
        return await commonApi('POST',`${serverUrl}/add-cart`,reqBody,reqHeader)
    }

    //get wishlist
export const getWishlistApi=async(reqHeader)=>
    {
        return await commonApi('GET',`${serverUrl}/get-wishlist`,"",reqHeader)
    } 

    //remove wishlist
    export const removeWishlistApi=async(id,reqHeader)=>
        {
            return await commonApi('DELETE',`${serverUrl}/remove-wishlist-item/${id}`,{},reqHeader)
        }

        //get cart
export const getCartApi=async(reqHeader)=>
    {
        return await commonApi('GET',`${serverUrl}/get-cart`,"",reqHeader)
    } 

    //remove cart
    export const removeCartApi=async(id,reqHeader)=>
        {
            return await commonApi('DELETE',`${serverUrl}/remove-cart-item/${id}`,{},reqHeader)
        }
         //add order
    export const addtoOrderapi=async(reqBody,reqHeader)=>{
      
        return await commonApi('POST',`${serverUrl}/add-order`,reqBody,reqHeader)
    }
    //delete cart
    export const deleteCartApi=async(reqHeader)=>
        {
            return await commonApi('DELETE',`${serverUrl}/delete-cart-item`,{},reqHeader)
        }
    
     //get user order
export const getuserorderApi=async(reqHeader)=>
    {
        return await commonApi('GET',`${serverUrl}/get-user-order`,"",reqHeader)
    } 

    //get an item api
    export const getanitemApi=async(id,reqHeader)=>
        {
            return await commonApi('GET',`${serverUrl}/get-an-item/${id}`,"",reqHeader)
        } 
    //add feedback api
    export const addFeedbackapi=async(reqBody,reqHeader)=>{
       
        return await commonApi('POST',`${serverUrl}/add-feedback`,reqBody,reqHeader)
    }
  //add customization api
  export const addCustomizationapi=async(reqBody,reqHeader)=>{
       
    return await commonApi('POST',`${serverUrl}/add-customization`,reqBody,reqHeader)
}
//get user customized order
export const getusercustomizedorderApi=async(reqHeader)=>
    {
        return await commonApi('GET',`${serverUrl}/get-user-customized-order`,"",reqHeader)
    } 

//get all user api
    export const getAllUserApi=async(reqHeader)=>
        {
            return await commonApi('GET',`${serverUrl}/get-all-users`,"",reqHeader)
           
        } 

    //get all feedbacks api
    export const getAllFeedbackApi=async(reqHeader)=>
        {
            return await commonApi('GET',`${serverUrl}/get-all-feedbacks`,"",reqHeader)
           
        } 
    //update feedbacks api
    export const updateFeedbackStatusApi=async(feedbackId, reqBody, reqHeader)=>
        {
            return await commonApi('POST',`${serverUrl}/update-status-feedback/${feedbackId}`,reqBody,reqHeader)
           
        } 

//get all accepted feedback api
export const getAllAcceptedFeedbacksApi=async()=>
    {
        return await commonApi('GET',`${serverUrl}/get-all-accepted-feedbacks`)
       
    } 
//get user name api
export const getusernameApi=async(id)=>
    {
        console.log(id)
        return await commonApi('GET',`${serverUrl}/get-username/${id}`)
    } 

    //get all custom orders api
    export const getAllcustomOrdersApi=async(reqHeader)=>
        {
            return await commonApi('GET',`${serverUrl}/get-all-custom-orders`,"",reqHeader)
           
        } 
    //update feedbacks api
    export const updatecustomorderStatusApi=async(orderId, reqBody, reqHeader)=>
        {
            return await commonApi('POST',`${serverUrl}/update-status-custom-orders/${orderId}`,reqBody,reqHeader)
           
        }
        
         //get all custom orders api
    export const getAllnormalOrdersApi=async(reqHeader)=>
        {
            return await commonApi('GET',`${serverUrl}/get-all-normal-orders`,"",reqHeader)
           
        } 
    //update feedbacks api
    export const updatenormalorderStatusApi=async(orderId, reqBody, reqHeader)=>
        {
            return await commonApi('POST',`${serverUrl}/update-status-normal-orders/${orderId}`,reqBody,reqHeader)
           
        } 

//update item api
export const updateitemApi=async(id,reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/update-item/${id}`,reqBody,reqHeader)
}



    