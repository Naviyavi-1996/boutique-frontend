import React, { useEffect, useState } from 'react';
import Adminheader from '../components/Adminheader';
import Footer from '../components/Footer';
import { getAllUserApi } from '../services/allApi';

function Users() {
  const [users, setUser] = useState([]);

  // Fetch users when the component mounts
  const getalluser = async () => {
    if (sessionStorage.getItem("token")) {
        const token=sessionStorage.getItem("token")
        const reqHeader={
      "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
      const result = await getAllUserApi(reqHeader);
      setUser(result.data);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getalluser();
  }, []); // Empty dependency array ensures it runs only once

  return (
    <>
      <Adminheader />
      <div className='container'>
        <div className='row'>
          {users.length > 0 ? (
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <h4 className='text-center text-warning'>Users</h4>
              <div className='col-md-6'>
                <div className='table table-responsive'  style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <table className='table table-striped table-success'>
                    <thead>
                      <tr>
                        <th>SI.NO</th>
                        <th>NAME</th>
                        <th>MAIL ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item?.username}</td>
                          <td>{item?.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <h4 className='text-center text-warning'>No Registered Users</h4>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Users;
