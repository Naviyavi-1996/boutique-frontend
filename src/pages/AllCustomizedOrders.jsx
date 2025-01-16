import React, { useEffect, useState } from 'react';
import Adminheader from '../components/Adminheader';
import { getAllcustomOrdersApi, updatecustomorderStatusApi } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';
import { Pie } from 'react-chartjs-2'; // Import the Pie chart component
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary components for Pie Chart
ChartJS.register(ArcElement, Tooltip, Legend);

function AllCustomizedOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newstatus, setNewStatus] = useState("");
  const [newremarks, setNewRemarks] = useState("");
  const [newprice, setNewPrice] = useState("");
  const [accepted, setAccepted] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [delivered, setDelivered] = useState(0);
  const [dispatched, setDispatched] = useState(0);
  const [returned, setReturned] = useState(0);
  const [canceled, setCanceled] = useState(0);
  const[pending,setPending]=useState(0);

  const getAllcustomOrders = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      try {
        const result = await getAllcustomOrdersApi(reqHeader);
        setOrders(result.data.customizations);
        setAccepted(result.data.acceptedCount);
        setRejected(result.data.rejectedCount);
        setDelivered(result.data.deliveredCount);
        setDispatched(result.data.dispatchedCount);
        setCanceled(result.data.canceledCount);
        setReturned(result.data.returnedCount);
        setPending(result.data.pendingCount);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const remarkChange = (e) => {
    setNewRemarks(e);
  };

  const updateStatus = async (orderId, userId, category, description, color, size, orderDate, noDateDelivery, address, phone, status, remarks, price) => {
    if (!price || !remarks || !status) {
      toast.warning("Please update the price, status, and remarks fields");
    } else {
      if (sessionStorage.getItem("token")) {
        const token = sessionStorage.getItem("token");
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        };

        try {
          const reqBody = new FormData();
          reqBody.append("userid", userId);
          reqBody.append("category", category);
          reqBody.append("description", description);
          reqBody.append("color", color);
          reqBody.append("size", size);
          reqBody.append("price", price);
          reqBody.append("orderdate", orderDate);
          reqBody.append("noDatedelivery", noDateDelivery);
          reqBody.append("address", address);
          reqBody.append("phone", phone);
          reqBody.append("remarks", remarks);
          reqBody.append("status", status);

          const result = await updatecustomorderStatusApi(orderId, reqBody, reqHeader);
          if (result.status === 200) {
            toast.success("Status updated successfully");
            getAllcustomOrders();
          }
        } catch (error) {
          toast.warning("Error updating customized order status.");
        }
      }
    }
  };

  const change = (e) => {
    setNewStatus(e);
  };

  const setPrice = (e) => {
    setNewPrice(e);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllcustomOrders();
  }, []); // Run once when the component mounts

  // Pie chart data and options
  const data = {
    labels: ['Accepted', 'Delivered', 'Dispatched', 'Rejected', 'Canceled', 'Returned','pending'],
    datasets: [
      {
        label: 'Order Status Distribution',
        data: [accepted, delivered, dispatched, rejected, canceled, returned,pending],
        backgroundColor: [
          'rgba(255, 255, 0, 0.5)',   //color for pending
          'rgba(0, 255, 0, 0.5)',     // Color for Accepted
          'rgba(0, 0, 255, 0.5)',     // Color for Delivered
          'rgba(255, 165, 0, 0.5)',   // Color for Dispatched
          'rgba(255, 0, 0, 0.5)',     // Color for Rejected
          'rgba(128, 128, 128, 0.5)', // Color for Canceled
          'rgba(255, 105, 180, 0.5)'  // Color for Returned
        ],
        borderColor: [
          'rgba(255, 255, 0, 1)',   //border color for pending
          'rgba(0, 255, 0, 1)',     // Border color for Accepted
          'rgba(0, 0, 255, 1)',     // Border color for Delivered
          'rgba(255, 165, 0, 1)',   // Border color for Dispatched
          'rgba(255, 0, 0, 1)',     // Border color for Rejected
          'rgba(128, 128, 128, 1)', // Border color for Canceled
          'rgba(255, 105, 180, 1)'  // Border color for Returned
        ],
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <>
      <Adminheader />
      <div className="container-fluid">
        <div className="row">
          {loading ? (
            <h4 className="text-center text-warning">Loading customized Orders</h4>
          ) : orders.length > 0 ? (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h4 className="text-center text-warning">Customized Orders</h4>
              <div className="col-md-8 table table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <table className="table table-striped table-success">
                  <thead>
                    <tr>
                      <th>SI.NO</th>
                      <th>User ID</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Color</th>
                      <th>Size</th>
                      <th>Price</th>
                      <th>Ordered On</th>
                      <th>Expected delivery in</th>
                      <th>Address</th>
                      <th>Contact No</th>
                      <th>Remarks</th>
                      <th>Status</th>
                      <th>Updations</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={order._id}>
                        <td>{index + 1}</td>
                        <td>{order?.userId}</td>
                        <td>{order?.category}</td>
                        <td>{order?.description}</td>
                        <td>{order?.color}</td>
                        <td>{order?.size}</td>
                        <td>{order?.price}</td>
                        <td>{order?.orderdate}</td>
                        <td>{order?.noDatedelivery}</td>
                        <td>{order?.address}</td>
                        <td>{order?.phone}</td>
                        <td>{order?.remarks}</td>
                        {order?.status=="Accepted" ? <td style={{color:'orange'}}>{order?.status}</td>:order?.status=="Rejected" ?<td style={{color:'maroon'}}>{order?.status}</td>:order?.status=="Returned" ?<td style={{color:'maroon'}}>{order?.status}</td>:<td>{order?.status}</td>}
                        <td>
                          <div className='d-flex flex-column'>
                            <select className="form-control mb-2" onChange={(e) => change(e.target.value)}>
                              <option value="">status</option>
                              <option value="Accepted">Accepted</option>
                              <option value="Rejected">Rejected</option>
                              <option value="Dispatched">Dispatched</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Canceled">Canceled</option>
                              <option value="Returned">Returned</option>
                            </select>
                            <input type="text" placeholder="Remarks!" className="form-control mb-2" onChange={(e) => remarkChange(e.target.value)} />
                            <input type="number" placeholder='Set Price' className='form-control' onChange={(e) => setPrice(e.target.value)} />
                          </div>
                        </td>
                        <td>
                          <button className="btn btn-primary" onClick={() => updateStatus(order._id, order.userId, order.category, order.description, order.color, order.size, order.orderdate, order.noDatedelivery, order.address, order.phone, newstatus, newremarks, newprice)}>Update</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Display the Pie chart under an h2 tag */}
              <h4 className='text-warning'>Order Analysis</h4>
             <div className='row d-flex w-100 justify-content-center align-items-center'>
                <div className="col-md-6 "style={{ width: '100%', height: '400px' }}>
                  <Pie data={data} options={options} />
                </div>
                <div className='table table-responsive col-md-6'>
                  <table className='table table-warning table-striped'>
                    <thead>
                      <tr>
                        <th>TOTAL</th>
                        <th>ACCEPTED</th>
                        <th>DELIVERED</th>
                        <th>DISPATCHED</th>
                        <th>CANCELED</th>
                        <th>RETURNED</th>
                        <th>REJECTED</th>
                        <th>PENDING</th>
                      </tr>
                    </thead>
                       <tbody>
                        <tr>
                          <td>{orders.length}</td>
                          <td>{accepted}</td>
                          <td>{delivered}</td>
                          <td>{dispatched}</td>
                          <td>{canceled}</td>
                          <td>{returned}</td>
                          <td>{rejected}</td>
                          <td>{pending}</td>
                        </tr>
                       </tbody>
                  </table>

                </div>
             </div>
            </div>
          ) : (
            <h4 className="text-center text-warning">No Customized Orders</h4>
          )}
        </div>
      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
      <Footer />
    </>
  );
}

export default AllCustomizedOrders;
