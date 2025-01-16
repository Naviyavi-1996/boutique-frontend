import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getanitemApi, getusercustomizedorderApi, getuserorderApi } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import { serverUrl } from '../services/serverUrl';

function Myorders() {
    const [order, setOrder] = useState([]);
    const [customOrder, setCustomOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const [singleitem, setsingleitem] = useState({});  // Store selected item details
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Fetch user orders
    const getUserorder = async () => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token");
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };

            try {
                const result = await getuserorderApi(reqHeader);
                setOrder(result.data);
            } catch (error) {
                toast.error("Failed to load orders");
            } finally {
                setLoading(false);
            }
        }
    };

        // Fetch user customized orders
        const getUserCustomizedorder = async () => {
            if (sessionStorage.getItem("token")) {
                const token = sessionStorage.getItem("token");
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                };
    
                try {
                    const result = await getusercustomizedorderApi(reqHeader);
                    setCustomOrder(result.data);
                } catch (error) {
                    toast.error("Failed to load orders");
                } finally {
                    setLoading(false);
                }
            }
        };

    // Fetch item details and set it for modal display
    const getItemDetails = async (id) => {
        console.log(id);
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token");
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };

            try {
                const result = await getanitemApi(id, reqHeader);
                setsingleitem(result.data); // Set the item details for the modal
                handleShow(); // Show the modal
            } catch (error) {
                toast.error("Failed to fetch item details");
            }
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        getUserorder();
        getUserCustomizedorder();
    }, []);

    return (
        <>
            <Header />
            <div className="container-fluid">
                <h4 className="text-warning text-center mt-3">Your Orders</h4>
                <div className="row my-3">
                    {loading ? (
                        <h4 className="text-center text-warning mt-5">Loading Orders...</h4>
                    ) : order.length > 0 ? (
                        <div className='col-md-6'>
                            <h4 className='text-center text-success'>Normal Orders</h4>
                           <div className='table table-responsive ' style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                <table className="table table-striped table-success mt-3">
                                    <thead>
                                        <tr>
                                            <th>SI.NO</th>
                                            {/* <th>Item id</th> */}
                                            <th>Description</th>
                                            <th>Color</th>
                                            <th>Price</th>
                                            <th>Size</th>
                                            <th>Ordered On</th>
                                            <th>Address</th>
                                            <th>Phone</th>
                                            <th>Remarks</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order?.map((item, index) => (
                                            <tr key={item.itemid} onClick={() => getItemDetails(item?.itemid)}>
                                                <td>{index + 1}</td>
                                              {/*   <td>{item?.itemid}</td> */}
                                                <td>{item?.description}</td>
                                                <td>{item?.color}</td>
                                                <td>{item?.price}</td>
                                                <td>{item?.size}</td>
                                                <td>{item?.orderdate}</td>
                                                <td>{item?.address}</td>
                                                <td>{item?.phone}</td>
                                                <td>{item?.remarks}</td>
                                                {item?.status=="Accepted" ? <td style={{color:'orange'}}>{item?.status}</td>:item?.status=="Rejected" ?<td style={{color:'maroon'}}>{item?.status}</td>:item?.status=="Returned" ?<td style={{color:'maroon'}}>{item?.status}</td>:<td>{item?.status}</td>}
                                                <td><button className='btn btn-primary'>VIEW</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                           </div>
                        </div>
                    ) : (
                       <div className='col-md-3'> <h4 className="text-warning mt-5">No Normal orders yet</h4></div>
                    )}
                   {customOrder.length >0 ? <div className='col-md-6'>
                    <h4 className='text-center text-success'>Customized Orders</h4>
                     <div className='table table-responsive'  style={{ maxHeight: '400px', overflowY: 'auto' }}>
                           <table className="table table-striped table-success mt-3">
                            <thead>
                                <tr>
                                    <th>SI.NO</th>
                                    <th>CATEGORY</th>
                                    <th>DESCRIPTION</th>
                                    <th>COLOR</th>
                                    <th>SIZE</th>
                                    <th>PRICE</th>
                                    <th>ORDERED ON</th>
                                    <th>PHONE</th>
                                    <th>ADDRESS</th>
                                    <th>STATUS</th>
                                    <th>REMARKS</th>
                                </tr>
                            </thead>
                            <tbody>
                                        {customOrder?.map((item, index) => (
                                           <tr>
                                                <td>{index + 1}</td>
                                                <td>{item?.category}</td>
                                                <td>{item?.description}</td>
                                                <td>{item?.color}</td>
                                                <td>{item?.size}</td>
                                                <td>{item?.price}</td>
                                                <td>{item?.orderdate}</td>
                                                <td>{item?.phone}</td>
                                                <td>{item?.address}</td>
                                                {item?.status=="Accepted" ? <td style={{color:'orange'}}>{item?.status}</td>:item?.status=="Rejected" ?<td style={{color:'maroon'}}>{item?.status}</td>:item?.status=="Returned" ?<td style={{color:'maroon'}}>{item?.status}</td>:<td>{item?.status}</td>}
                                                <td>{item?.remarks}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                           </table>
                     </div>
                    </div>:
                    <div className='col-md-3'> <h4 className="text-warning mt-5">No Customized orders yet</h4></div>}
                </div>
            </div>

            {/* Modal for displaying item details */}
            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: 'rgb(252, 91, 118)' }}>{singleitem?.category}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-md-6'>
                            <img
                                src={`${serverUrl}/upload/${singleitem?.itemImage}`}
                                alt="no image"
                                style={{ width: '100%', height: '500px' }}
                            />
                        </div>

                        <div className='col-md-6'>
                         {/*    <h5>Description:</h5>
                            <p>{singleitem?.description}</p>
                            <h5>Color:</h5>
                            <p>{singleitem?.color}</p>
                            <h5>Price:</h5>
                            <p>₹{singleitem?.price}</p> */}
                            <h5>Dispatch Time:</h5>
                            <p>{singleitem?.dispatchTime}</p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Footer />
        </>
    );
}

export default Myorders;
