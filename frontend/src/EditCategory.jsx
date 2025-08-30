import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function EditCategory() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
    });

    const handleUpdate = () => {
        axios.put(`http://localhost:8081/editCategory/${id}`, values)
            .then(response => {
                console.log('Category updated successfully:', response.data);
                navigate('/category');
            })
            .catch(error => {
                console.error('Error updating category:', error);
            });

            
    };

    return (
        <div className='d-flex justify-content-center align-items-center min-vh-100'>
            <div className='bg-white p-4 rounded'>
                <form onSubmit={handleUpdate}>
                    <h2>Update Category</h2>
                    <div className='mb-3'>
                        <label htmlFor='name'>Name:</label>
                        <input type="text" id='name' placeholder='Enter Category Name' className='form-control' value={values.name}
                            onChange={e => setValues({ ...values, name: e.target.value })} />
                    </div>
                

                    <Link to="#" className='btn btn-primary m-4' onClick={handleUpdate}>Update</Link>
                    <Link to="/category" className='btn btn-secondary m-4'>Cancel</Link>
                </form>
            </div>
        </div>
    );
}

export default EditCategory;