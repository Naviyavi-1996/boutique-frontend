
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '/src/images/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { loginResponseContext } from '../context/Contextshare';
import { useContext } from 'react';
function Header() {
const navigate=useNavigate()
const{setLoginResponse}=useContext(loginResponseContext)
  const logout=()=>{
    sessionStorage.removeItem('existinguser')
    sessionStorage.removeItem('token')
    setLoginResponse(false)
    navigate('/')
  }
  
  return (
    <>
    <Navbar expand="lg" style={{backgroundColor:'rgb(252, 91, 118)'}}>
      <Container>
        <Navbar.Brand href="#home"><img src={logo}alt="no image" style={{height:'100px',width:'100px'}}/>
        </Navbar.Brand>
        <div>
          <h3 className='brand'>She Designs</h3>
          <h5 className='caption'>Style your moments</h5>
       </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
         <Link to={'/'}> <Nav.Link href="#home"><button className='btn rounded border-0'style={{color:'black'}}>Home</button></Nav.Link></Link>
         <Link to={'/shopping'}> <Nav.Link href="#home"><button className='btn rounded border-0'style={{color:'black'}}>Shop</button></Nav.Link></Link>
         <Link to={'/customization'}> <Nav.Link href="#home"><button className='btn rounded border-0'style={{color:'black'}}>Customization</button></Nav.Link></Link>
         <Link to={'/wishlist'}> <Nav.Link href="#home"><button className='btn rounded border-0'style={{color:'black'}}>Wishlist</button></Nav.Link></Link>
         <Link to={'/cart'}> <Nav.Link href="#home"><button className='btn rounded border-0'style={{color:'black'}}>Cart</button></Nav.Link></Link>
         <Link to={'/myorders'}> <Nav.Link href="#home"><button className='btn rounded border-0'style={{color:'black'}}>My Orders</button></Nav.Link></Link>
         <Link to={'/feedback'}> <Nav.Link href="#home"><button className='btn rounded border-0'style={{color:'black'}}>Feedback</button></Nav.Link></Link>
            <Nav.Link href=""><button className='btn btn-outline-dark rounded shadow'style={{color:'black',borderColor:"black"}} onClick={logout}>LOG OUT</button></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Header