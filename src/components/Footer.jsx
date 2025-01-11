import React, { useState } from 'react'
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import logo from '/src/images/logo.png'
function Footer() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className='p-5' style={{ backgroundColor: 'rgb(252, 91, 118)' }}>
                <div className='container-fluid'>
                    <div className='row'>

                        <div className='col-md-4' style={{ color: 'black' }}>
                            <h3 className='caption' style={{ color: 'white' }}>She Designs</h3>
                            <h5 className='caption'>Style your Moments</h5>
                            <p className="mt-3" style={{ textAlign: 'justify' }}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, distinctio eum et possimus odio facilis id aut provident laborum doloribus quos, consectetur, reiciendis cum ullam animi earum! Repellendus, necessitatibus fugiat. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere officia porro iure doloremque necessitatibus. Temporibus eveniet esse pariatur beatae, quisquam rem adipisci corrupti neque laudantium mollitia consectetur veniam deleniti quae! </p>
                        </div>
                        <div className='col-md-2 d-md-flex justify-content-center'>
                            <div style={{ color: 'black' }}>
                                <h3 style={{ color: 'white' }}>Links</h3>
                                <p className='mt-3'><Link to={'/'}style={{textDecoration:'none',color:'black'}}>Home</Link></p>
                                <p>Shop Now</p>
                                <p>Feedback</p>
                                <p>Customer Reviews</p>
                            </div>
                        </div>
                       
                        <div className='col-md-3 d-md-flex justify-content-center'>
                            <div style={{ color: 'black' }}>
                                <h3 style={{ color: 'white' }}>Location</h3>

                                <p  style={{ color: 'black' }} onClick={handleShow}>
                                    <FontAwesomeIcon icon={faLocationDot} className="me-3" />
                                    She Designs Edappally
                                </p>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <h3 style={{ color: 'white' }}>Contact Us</h3>
                            <div className='d-flex mt-3'>
                                <input type="text" placeholder='Email-id' className='form-control rounded-0' />
                                <button className='btn btn-success ms-2 rounded-0'>Subscribe</button>
                            </div>
                            <div className='d-flex mt-3 justify-content-between'>
                                <FontAwesomeIcon icon={faInstagram} className='fa-2x text-light' />
                                <FontAwesomeIcon icon={faWhatsapp} className='fa-2x text-light' />
                                <FontAwesomeIcon icon={faFacebook} className='fa-2x text-light' />

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <img src={logo} alt="no image" style={{height:'100px',width:'100px',backgroundColor:'white'}} />
                    <div className='d-flex flex-column'>
                        <Modal.Title className='brand'>She Designs</Modal.Title>
                        <h5 className='caption'>Style your Moments</h5>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31431.079547984365!2d76.29152174309465!3d10.026352465129586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080da53444d5e9%3A0xb46c57c6b1bc9aff!2sEdappally%2C%20Kochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1731222384421!5m2!1sen!2sin" width="100%" height="400px" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Footer
