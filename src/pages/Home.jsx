import React, { useEffect, useState } from 'react'
import Adminheader from '../components/Adminheader';
import Footer from '../components/Footer'
import { Carousel} from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Reviewcard from '../components/Reviewcard';
import logo from '/src/images/logo.png'
import { getAllAcceptedFeedbacksApi, homeItemApi } from '../services/allApi';
import { serverUrl } from '../services/serverUrl';
function Home() {
  const[login,setIsLogin]=useState(false)
  const[username,setUsername]=useState("")
  const [homeitem, setHomeItem] = useState([])
const[acceptedfeedbacks,setacceptedfeedbacks]=useState([])
  const getHomeItem= async () => {
    const result = await homeItemApi()
    console.log (result); 
    setHomeItem(result.data)
  }

  
  const getacceptedfeedbacks= async () => {
    const result = await getAllAcceptedFeedbacksApi()
    console.log (result); 
    setacceptedfeedbacks(result.data)
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getHomeItem()
    if (sessionStorage.getItem("token")) {
      const user=JSON.parse(sessionStorage.getItem("existinguser"))
      if(user.username=='admin')
      setUsername('admin')
      setIsLogin(true)
    }
    else {
      setIsLogin(false)
    }
    getacceptedfeedbacks()
  }, [])
  return (
    <>
    {username ? <Adminheader/>:
      <div style={{backgroundColor:'rgb(252, 91, 118)'}} className='d-flex'>
         <img src={logo} alt="no image" height={'100px'} width={'100px'} className='ms-2'/>
         <div className='mt-3'>
          <h3 className='brand'>She Designs</h3>
          <h5 className='caption'>Style your moments</h5>
       </div>
      </div>}

      <Carousel>
        <Carousel.Item interval={700}>
          <div className='background d-flex flex-column justify-content-center align-items-center' style={{ backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1664202526559-e21e9c0fb46a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym91dGlxdWV8ZW58MHx8MHx8fDA%3D")', backgroundRepeat: 'no-repeat' }}>
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <h1 className='brand'><span style={{ color: 'rgb(252, 91, 118)' }}>She</span> Designs</h1>
              <h4 className='caption'>Style your Moments</h4>
             {(login && username=="") && <Link to={'/shopping'}><button className='btn rounded shadow btn-success'>Shop Now</button></Link>}
             
              {!login && <Link to={'/login'}button className='btn rounded shadow btn-success'>Start Now</Link>}
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item interval={700}>
          <div className='background d-flex flex-column justify-content-center align-items-center' style={{ backgroundImage: 'url("https://t4.ftcdn.net/jpg/06/34/09/69/360_F_634096945_nT013AXOaokOmXXU0mRlfSLmnSbbmZXw.jpg")', backgroundRepeat: 'no-repeat' }}>
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <h1 className='brand'><span style={{ color: 'rgb(252, 91, 118)' }}>She</span> Designs</h1>
              <h4 className='caption'>Style your Moments</h4>
              {(login && username=="") && <Link to={'/shopping'}><button className='btn rounded shadow btn-success'>Shop Now</button></Link>}
             
             {!login && <Link to={'/login'}button className='btn rounded shadow btn-success'>Start Now</Link>}
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item interval={700}>
          <div className='background d-flex flex-column justify-content-center align-items-center' style={{ backgroundImage: 'url("https://jnjexperts.com/wp-content/uploads/2022/02/boutique-services.jpg")', backgroundRepeat: 'no-repeat' }}>
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <h1 className='brand'><span style={{ color: 'rgb(252, 91, 118)' }}>She</span> Designs</h1>
              <h4 className='caption'>Style your Moments</h4>
              {(login && username=="") && <Link to={'/shopping'}><button className='btn rounded shadow btn-success'>Shop Now</button></Link>}
             
              {!login && <Link to={'/login'}button className='btn rounded shadow btn-success'>Start Now</Link>}
            </div>
          </div>

        </Carousel.Item>
      </Carousel>
      {/* Gallery */}
      <h3 className='text-center mt-5'>Our Designs</h3>
   <div className='container bg-success'>
       <marquee behavior="scroll" direction="left" scrollamount="20">
          <div className='container-fluid mt-3'>
            <div className="row">
            {homeitem?.map((item)=>( <div className="col-md-3 p-md-5 text-center">
             
                <Card style={{ width: '100%', height:'370px',backgroundColor:'rgb(252, 91, 118)' }} className='mt-1  border-0 shadow p-3 d-flex align-items-center'>
                <Card.Img variant="top" src={`${serverUrl}/upload/${item?.itemImage}`}className='w-100' style={{height:'250px'}}/>
                <Card.Body>
                  <Card.Title className='text-center' style={{color:'white'}}>{item.category}</Card.Title>
                </Card.Body>
              </Card>
              
              </div>))}
            </div>
          </div>
       </marquee>
   </div>
      
      {acceptedfeedbacks.length>0 && <div><h3 className='text-center mt-5'>Feedbacks</h3>
      <div className='container-fluid my-3'>
        <div className="row">
       {acceptedfeedbacks.map((item)=>( <div className="col-md-6 p-md-5 text-center">
            <Reviewcard feedbacks={item}/> 
          </div>))}
          </div>
          </div>
          </div>}
          <p className='text-center'>Continue Shopping?Please <Link to={'/login'} style={{textDecoration:'none'}}> <span style={{color:'red'}}>Login</span></Link></p>
      <Footer />
    </>
  )
}

export default Home