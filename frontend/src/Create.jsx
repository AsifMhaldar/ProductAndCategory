import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Create() {
    const [categories, setCategories] = useState([]);
    const [values, setValues] = useState({
        name: '',
        price: '',
        category_id: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8081/api/categories")  
            .then(res => setCategories(res.data))
            .catch(err => console.error("Error fetching categories:", err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/api/products', values)
            .then((response) => {
                console.log("Product created:", response.data);
                navigate('/');
            })
            .catch((error) => {
                console.error("Error creating product:", error);
            });
    };

    return (
        <div className='d-flex justify-content-center align-items-center min-vh-100'>
            <div className='bg-white p-4 rounded'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Product</h2>

                    <div className='mb-3'>
                        <label htmlFor='name'>Name:</label>
                        <input
                            type="text"
                            id='name'
                            placeholder='Enter Product Name'
                            className='form-control'
                            value={values.name}
                            onChange={e => setValues({ ...values, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='price'>Price:</label>
                        <input
                            type="number"
                            id='price'
                            placeholder='Enter Product Price'
                            className='form-control'
                            value={values.price}
                            onChange={e => setValues({ ...values, price: e.target.value })}
                            required
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='category'>Category:</label>
                        <select
                            id="category"
                            className='form-control'
                            value={values.category_id}
                            onChange={e => setValues({ ...values, category_id: e.target.value })}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className='btn btn-primary'>Add Product</button>
                    <Link to="/" className='btn btn-secondary m-4'>Cancel</Link>
                </form>
            </div>
        </div>
    );
}

export default Create;
