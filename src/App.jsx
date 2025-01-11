
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import PagenotFound from './pages/PagenotFound'
import Welcome from './pages/Welcome'
import Shopping from './pages/Shopping'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Feedback from './pages/Feedback'
import Myorders from './pages/Myorders'
import Customization from './pages/Customization'
import Viewfeedback from './pages/Viewfeedback'
import Users from './pages/Users'
import Allitems from './pages/Allitems'
import { loginResponseContext } from './context/Contextshare'
import { useContext } from 'react'
import AllCustomizedOrders from './pages/AllCustomizedOrders'
import Allnormalorders from './pages/Allnormalorders'


function App() {
  const{loginResponse}=useContext(loginResponseContext)
  return (
    <>
    <Routes><Route path={'/'} element={<Home/>}/>
    <Route path={'/login'} element={<Login/>}/>
    <Route path={'/register'} element={<Login register={true}/>}/>
    <Route path= {'/welcome'} element={loginResponse?<Welcome/>:<PagenotFound/>}/>
    <Route path= '*' element={<PagenotFound/>}/>
    <Route path='/shopping' element={loginResponse?<Shopping/>:<PagenotFound/>}/>
    <Route path='/cart' element={loginResponse?<Cart/>:<PagenotFound/>}/>
    <Route path='/wishlist' element={loginResponse?<Wishlist/>:<PagenotFound/>}/>
    <Route path='/feedback' element={loginResponse?<Feedback/>:<PagenotFound/>}/>
    <Route path='/myorders' element={loginResponse?<Myorders/>:<PagenotFound/>}/>
    <Route path='/customization' element={loginResponse?<Customization/>:<PagenotFound/>}/>
    <Route path='/viewfeedback' element={loginResponse?<Viewfeedback/>:<PagenotFound/>}/>
    <Route path='/viewusers' element={loginResponse?<Users/>:<PagenotFound/>}/>
    <Route path='/viewdesigns' element={loginResponse?<Allitems/>:<PagenotFound/>}/>
    <Route path='/viewcustomorders' element={loginResponse?<AllCustomizedOrders/>:<PagenotFound/>}/>
    <Route path='/viewnormalorders' element={loginResponse?<Allnormalorders/>:<PagenotFound/>}/>
    
    </Routes>
    </>
  )
}

export default App
