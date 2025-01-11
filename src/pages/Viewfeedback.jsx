import React, { useState, useEffect } from 'react';
import Adminheader from '../components/Adminheader';
import Footer from '../components/Footer';
import { getAllFeedbackApi, updateFeedbackStatusApi } from '../services/allApi';  // assuming API functions
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Viewfeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const[newstatus,setnewStatus]=useState("")

  // Fetch all feedbacks
  const getAllFeedbacks = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      try {
        const result = await getAllFeedbackApi(reqHeader);
        setFeedbacks(result.data);  // Set feedback data
        // Initialize selectedStatus for each feedback
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle feedback status update
  const updateStatus = async (userId,feedback,feedbackId, status) => {
    if(!status)
    {
      toast.warning("please update the status")
    }
    else{
      if (sessionStorage.getItem("token")) {
        const token = sessionStorage.getItem("token");
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        };
  
        try {
          const reqBody=new FormData()
        reqBody.append("feedback",feedback)
        reqBody.append("userId",userId)
        reqBody.append("status",status)
        const result=await updateFeedbackStatusApi(feedbackId, reqBody, reqHeader);
         if(result.status==200) {
          toast.success("status updated succesfully")
          setFeedbacks(result.data);
          getAllFeedbacks()
        }
        } catch (error) {
          toast.warning("Error updating feedback status:");
        }
      }
    }
   
  };
const change=(e)=>{
 setnewStatus(e)
}
  useEffect(() => {
    window.scrollTo(0, 0);
    getAllFeedbacks();
  },[]); // Run once when the component mounts

  return (
    <>
      <Adminheader />
      <div className="container">
        <div className="row">
          {loading ? (
            <h4 className="text-center text-warning">Loading Feedbacks...</h4>
          ) : feedbacks.length > 0 ? (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h4 className="text-center text-warning">Feedbacks</h4>
              <div className="col-md-8 table table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <table className="table table-striped table-success">
                  <thead>
                    <tr>
                      <th>SI.NO</th>
                      <th>User ID</th>
                      <th>Feedback</th>
                      <th>Status</th>
                      <th>Update Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedbacks.map((feedback, index) => (
                      <tr key={feedback._id}>
                        <td>{index + 1}</td>
                        <td>{feedback?.userId}</td>
                        <td>{feedback?.feedback}</td>
                        <td>{feedback?.status}</td>
                        <td>
                         { <select
                            className="form-control"
                        onChange={(e)=>{change(e.target.value)}}> 
                            <option value="">status</option>
                            <option value="Accepted">Accept</option>
                            <option value="Rejected">Reject</option>
                          </select>}
                        </td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => updateStatus(feedback.userId,feedback.feedback,feedback._id,newstatus)} // Update status for this feedback
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <h4 className="text-center text-warning">No Feedbacks</h4>
          )}
        </div>
      </div>
        <ToastContainer theme='colored' position='top-center' autoClose={2000} />
      <Footer />
    </>
  );
}

export default Viewfeedback;
