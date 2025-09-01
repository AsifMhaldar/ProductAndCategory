import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
  });


  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/categories/${id}`)
      .then((res) => {
        setValues({ name: res.data.name || '' });
      })
      .catch((err) => {
        console.error('Error fetching category:', err);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8081/api/categories/${id}`, values)
      .then(() => {
        console.log('Category updated successfully');
        navigate('/category');
      })
      .catch((err) => {
        console.error('Error updating category:', err);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="bg-white p-4 rounded">
        <form onSubmit={handleUpdate}>
          <h2>Update Category</h2>
          <div className="mb-3">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Category Name"
              className="form-control"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary m-2">
            Update
          </button>
          <Link to="/category" className="btn btn-secondary m-2">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}

export default EditCategory;
