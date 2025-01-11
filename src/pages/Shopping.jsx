import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { allItemApi } from '../services/allApi';
import Dresscard from '../components/Dresscard';
import { editResponseContext } from '../context/Contextshare'
import { addResponseContext } from '../context/Contextshare'
function Shopping() {
  const [allitem, setAllItem] = useState([])
  const[searchKey,setSearchKey]=useState([])
  const[isadmin,setIsadmin]=useState(false)
  const {editResponse}=useContext(editResponseContext)
  const {addResponse}=useContext(addResponseContext)
    const getAllItem= async () => {
      if(sessionStorage.getItem("token")){ 
        const user=JSON.parse(sessionStorage.getItem("existinguser"))
        if(user.username=='admin')
        {
          setIsadmin(true)
        }
        const token=sessionStorage.getItem("token")
        const reqHeader={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
        }
      const result = await allItemApi(searchKey,reqHeader)
      console.log (result); 
      setAllItem(result.data)
    }
  }
     useEffect(() => {
      window.scrollTo(0, 0);
        getAllItem()
      }, [searchKey,editResponse,addResponse])
  return(
   <>
    {!isadmin && <Header/>}
     <div className="row "style={{backgroundColor:'rgb(252, 91, 118)'}}>
      <div className='col-md-8'>
       
      </div>
<div className=' col-md-4'>
       <div className='d-flex'>
       <div className='col-md-4 w-100 d-flex'>
      <input type="text" placeholder='Search Your Outfit Here by color or category' className='form-control shadow'  onChange={(e)=>setSearchKey(e.target.value)}/>
      <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:'lightgrey',marginTop:'11.5px',marginLeft:'-30px'}} />
    </div>
       </div>
</div>
     </div>
    { allitem.length>0 ? <div className='container-fluid'>
     <div className='row my-5'>
     {allitem?.map((item)=>(<div className='col-md-3 mt-2'><Dresscard dress={item}/></div>))}
     </div>
     </div>:
     <h4 className='text-warning text-center'>No Items To Show</h4> }
     
  <Footer/>
   </>
  )
}

export default Shopping