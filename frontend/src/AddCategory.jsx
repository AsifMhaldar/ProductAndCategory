import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddCategory() {
    const [values, setValues] = React.useState({
        name: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/api/categories', values)
            .then((response) => {
                console.log("Category created:", response.data);
                navigate('/category'); 
            })
            .catch((error) => {
                console.error("Error creating category:", error);
            });
    };

    return (
        <div className='d-flex justify-content-center align-items-center min-vh-100'>
            <div className='bg-white p-4 rounded shadow-sm'>
                <form onSubmit={handleSubmit}>
                    <h2 className="mb-4">Add Category</h2>
                    
                    <div className='mb-3'>
                        <label htmlFor='name'>Name:</label>
                        <input 
                            type="text" 
                            id='name' 
                            placeholder='Enter Category Name' 
                            className='form-control'
                            value={values.name}
                            onChange={e => setValues({...values, name: e.target.value})}
                            required
                        />
                    </div>

                    <button type="submit" className='btn btn-primary'>Add Category</button>
                    <Link to="/category" className='btn btn-secondary ms-3'>Cancel</Link>
                </form>
            </div>
        </div>
    );
}

export default AddCategory;
