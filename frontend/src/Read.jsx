import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Read() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8081/api/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    }
  }, [id]);


  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3 d-flex flex-column align-items-center">
        <h2>Product Details</h2>
        <h2 className="mb-4 text-primary">
          <strong>{product.name}</strong>
        </h2>
        <p className="fs-5 mb-3">
          <strong>Price:</strong> ₹{product.price}
        </p>
        <p className="fs-5 mb-3">
          <strong>Category:</strong> {product.category || "N/A"}
        </p>
        <Link to="/" className="btn btn-primary">Go Back</Link>
      </div>
    </div>
  );
}

export default Read;
