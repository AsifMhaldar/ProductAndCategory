import axios from 'axios';
import React from 'react'
import { useEffect,useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Read() {

    const {id} = useParams();

    const [product, setProduct] = useState();

    useEffect(() =>{
        axios.get(`http://localhost:8081/products/${id}`)
        .then((response) => {
            console.log(response.data);
            setProduct(response.data);
        })
        .catch((error) => {
            console.error("Error fetching product:", error);
        });
    },[]);


  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3 d-flex flex-column align-items-center'>
            <h2>Product Details</h2>
            <h2 className="mb-4 text-primary"><strong>{product?.name}</strong></h2>
            <p className="fs-5 mb-3"><strong>Price:</strong> ₹{product?.price}</p>
            <Link to="/" className='btn btn-primary'>Go Back</Link>
            {/* <Link to={`/edit/${product?.id}`} className='btn btn-warning'>Edit</Link> */}
        </div>
    </div>
  )
}

export default Read;