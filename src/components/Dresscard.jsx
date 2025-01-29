import React, { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { serverUrl } from '../services/serverUrl';
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addtoCartapi, addtoWishlistapi, updateitemApi } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editResponseContext } from '../context/Contextshare';

function Dresscard({ dress }) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setSelectedSize('');
  };
  const [isadmin, setIsadmin] = useState(false);
  const handleShow = () => setShow(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [showEdit, setshowedit] = useState(false);
  const [itemDetails, setItemDetails] = useState({
    category: dress.category,
    description: dress.description,
    price: dress.price,
    color: dress.color,
    itemImage: '', // Initially empty
  });

  const [preview, setPreview] = useState('');
  const [token, setToken] = useState('');
  const { setEditResponse } = useContext(editResponseContext);
  const [key, setKey] = useState(1);

  useEffect(() => {
    if (itemDetails.itemImage) {
      setPreview(URL.createObjectURL(itemDetails.itemImage)); 
    } else if (dress.itemImage) {
      setPreview(`${serverUrl}/upload/${dress.itemImage}`); 
    }
  }, [itemDetails.itemImage, dress.itemImage]);

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    }
    if (sessionStorage.getItem('token')) {
      const user = JSON.parse(sessionStorage.getItem('existinguser'));
      if (user.username == 'admin') {
        setIsadmin(true);
      }
    }
  }, []);

  const handleFile = (e) => {
    setItemDetails({ ...itemDetails, itemImage: e.target.files[0] });
  };

  const cancel = () => {
    setshowedit(false);
    setItemDetails({
      category: dress.category,
      description: dress.description,
      price: dress.price,
      color: dress.color,
      itemImage: '', // Reset to empty string for cancel
    });
    setPreview('');
    setKey((prevKey) => (prevKey === 1 ? 0 : 1)); // Toggle key value
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const update = async () => {
    const { category, description, price, color, itemImage } = itemDetails;
    const dispatchTime = '15-30 days after order placed';

    if (!category || !description || !price || !color || !dispatchTime) {
      toast.info('Please complete the form completely');
      return;
    }
    const reqBody = new FormData();
    reqBody.append('category', category);
    reqBody.append('description', description);
    reqBody.append('price', price);
    reqBody.append('color', color);
    reqBody.append('dispatchTime', dispatchTime);

    // If preview exists, append the selected image; otherwise, use the original dress image
    if (itemDetails.itemImage) {
      if (itemImage && (itemImage.type === 'image/jpeg' || itemImage.type === 'image/png' || itemImage.type === 'image/jpg')) 
        {
      reqBody.append('itemImage', itemImage); // New image
        } 
      else{
     alert("image format not supported")
        }
      }
    else {
      reqBody.append('itemImage', dress.itemImage); // No image change, use existing
    }

    const reqHeader = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    };

    const result = await updateitemApi(dress._id, reqBody, reqHeader);
    console.log(result);

    if (result.status === 200) {
      
     /*  toast.success('Item updated successfully'); */
      setEditResponse(result);
      setTimeout(() => {
        handleClose();
        setshowedit(false);
        cancel();
      }, 2000);
    } else {
      toast.error('Something went wrong');
      cancel();
      setshowedit(false);
    }
  };

  // Add to wishlist function
  const addWishlist = async () => {
    const itemid = dress._id;
    if (selectedSize) {
      const size = `${selectedSize}`;
      const user = JSON.parse(sessionStorage.getItem('existinguser'));
      const reqBody = new FormData();
      reqBody.append('itemid', itemid);
      reqBody.append('size', size);
      reqBody.append('category', dress?.category);
      reqBody.append('description', dress?.description);
      reqBody.append('price', dress?.price);
      reqBody.append('color', dress?.color);
      reqBody.append('dispatchTime', dress?.dispatchTime);
      reqBody.append('itemImage', dress?.itemImage);

      const token = sessionStorage.getItem('token');
      const reqHeader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const result = await addtoWishlistapi(reqBody, reqHeader);
      if (result.status === 200) {
        toast.success('Added to wishlist successfully');
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        toast.error('Something went wrong');
      }
    } else {
      toast.warning('Please select a size!');
    }
  };

  // Add to cart function
  const addCart = async () => {
    const itemid = dress._id;
    if (selectedSize) {
      const size = `${selectedSize}`;
      const user = JSON.parse(sessionStorage.getItem('existinguser'));
      const reqBody = new FormData();
      reqBody.append('itemid', itemid);
      reqBody.append('size', size);
      reqBody.append('category', dress?.category);
      reqBody.append('description', dress?.description);
      reqBody.append('price', dress?.price);
      reqBody.append('color', dress?.color);
      reqBody.append('dispatchTime', dress?.dispatchTime);
      reqBody.append('itemImage', dress?.itemImage);

      const token = sessionStorage.getItem('token');
      const reqHeader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const result = await addtoCartapi(reqBody, reqHeader);
      if (result.status === 200) {
        toast.success('Added to cart successfully');
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        toast.error('Something went wrong');
      }
    } else {
      toast.warning('Please select a size!');
    }
  };

  const showupdate = () => {
    setShow(false);
    setshowedit(true);
  };

  return (
    <>
      <div>
        <Card style={{ width: '100%', backgroundColor: 'rgb(252, 91, 118)' }} className="p-1">
          <Card.Img
            variant="top"
            src={`${serverUrl}/upload/${dress?.itemImage}`}
            style={{ height: '350px' }}
            onClick={handleShow}
          />
          <Card.Body className="d-flex flex-column justify-content-center align-items-center">
            <Card.Title style={{ color: 'black' }} className="text-center">
              {dress?.category}
            </Card.Title>
            <p style={{ color: 'white' }}>{dress?.price}</p>
          </Card.Body>
        </Card>
      </div>

      {/* Item Modal */}
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'rgb(252, 91, 118)' }}>{dress?.category}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <img
                src={`${serverUrl}/upload/${dress?.itemImage}`}
                alt="no image"
                style={{ width: '100%', height: '500px' }}
              />
            </div>
            <div className="col-md-6">
              <h5>Description:</h5>
              <p>{dress?.description}</p>
              <h5>Color:</h5>
              <p>{dress?.color}</p>
              {!isadmin && (
                <>
                  <h5>Select a size</h5>
                  <div className="d-flex justify-content-between">
                    <input
                      id="small"
                      name="size"
                      type="radio"
                      value="small"
                      onChange={handleSizeChange}
                      checked={selectedSize === 'small'}
                    />
                    <label htmlFor="small">Small</label>
                    <input
                      id="medium"
                      name="size"
                      type="radio"
                      value="medium"
                      onChange={handleSizeChange}
                      checked={selectedSize === 'medium'}
                    />
                    <label htmlFor="medium">Medium</label>
                    <input
                      id="large"
                      name="size"
                      type="radio"
                      value="large"
                      onChange={handleSizeChange}
                      checked={selectedSize === 'large'}
                    />
                    <label htmlFor="large">Large</label>
                    <input
                      id="xl"
                      name="size"
                      type="radio"
                      value="xl"
                      onChange={handleSizeChange}
                      checked={selectedSize === 'xl'}
                    />
                    <label htmlFor="xl">XL</label>
                    <input
                      id="xxl"
                      name="size"
                      type="radio"
                      value="xxl"
                      onChange={handleSizeChange}
                      checked={selectedSize === 'xxl'}
                    />
                    <label htmlFor="xxl">XXL</label>
                  </div>
                </>
              )}
              <h5>Price:</h5>
              <p>₹{dress?.price}</p>
              <h5>Dispatch Time:</h5>
              <p>{dress?.dispatchTime}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {!isadmin ? (
            <div className="justify-content-between">
              <button
                className="btn"
                style={{ color: 'rgb(252, 91, 118)' }}
                onClick={addWishlist}
              >
                <FontAwesomeIcon icon={faHeart} className="me-2" />
                WishList
              </button>
              <button className="btn" style={{ color: 'rgb(252, 91, 118)' }} onClick={addCart}>
                <FontAwesomeIcon icon={faCartShopping} className="me-2" />
                Cart
              </button>
            </div>
          ) : (
            <div>
              <button className="btn btn-warning" onClick={showupdate}>
                Edit
              </button>
            </div>
          )}
        </Modal.Footer>
       
<ToastContainer theme="colored" position="top-center" autoClose={2000} />
      </Modal>

      {/* Edit Modal */}
      {showEdit && (
        <Modal size="lg" show={showEdit} onHide={handleClose}>
          <div className="row d-flex justify-content-center align-items-center bg-success p-5 shadow rounded">
            <div className="col-md-6">
              <label htmlFor="itemImage">
                <input
                  type="file"
                  id="itemImage"
                  style={{ display: 'none' }}
                  onChange={handleFile}
                  key={key}
                />
                <img
                  src={preview ? preview : `${serverUrl}/upload/${dress.itemImage}`}
                  alt="no image"
                  className="w-100"
                  style={{ height: '300px' }}
                />
              </label>
            </div>
            <div className="col-md-12">
              <div className="mt-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Category"
                  value={itemDetails.category}
                  onChange={(e) => {
                    setItemDetails({ ...itemDetails, category: e.target.value });
                  }}
                />
              </div>
              <div className="mt-2">
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  value={itemDetails.description}
                  onChange={(e) => {
                    setItemDetails({ ...itemDetails, description: e.target.value });
                  }}
                />
              </div>
              <input
                type="number"
                placeholder="price"
                className="form-control mt-2"
                value={itemDetails.price}
                onChange={(e) => {
                  setItemDetails({ ...itemDetails, price: e.target.value });
                }}
              />
              <input
                type="text"
                placeholder="color"
                className="form-control mt-2"
                value={itemDetails.color}
                onChange={(e) => {
                  setItemDetails({ ...itemDetails, color: e.target.value });
                }}
              />
              <div className="d-flex justify-content-between mt-4">
                <button className="btn btn-primary" onClick={update}>
                  Update
                </button>
                <button className="btn btn-warning" onClick={cancel}>
                  Cancel
                </button>
              </div>
            </div>    
          </div>
                 
<ToastContainer theme="colored" position="top-center" autoClose={2000} />
        </Modal>
      )}
    </>
  );
}

export default Dresscard;
