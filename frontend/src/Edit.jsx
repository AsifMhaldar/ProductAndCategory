import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Edit() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [values, setValues] = useState({
        name: '',
        price: '',
        category_id: ''
    });


    useEffect(() => {
        axios.get(`http://localhost:8081/products/${id}`)
            .then(response => {
                setProduct(response.data);
                setValues({
                    name: response.data.name || '',
                    price: response.data.price || '',
                    category_id: response.data.category_id || ''
                });
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            });

        axios.get('http://localhost:8081/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, [id]);


    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8081/update/${id}`, values)
            .then(response => {
                console.log('Product updated successfully:', response.data);
                navigate('/');
            })
            .catch(error => {
                console.error('Error updating product:', error);
            });
    };

    return (
        <div className='d-flex justify-content-center align-items-center min-vh-100'>
            <div className='bg-white p-4 rounded'>
                <form onSubmit={handleUpdate}>
                    <h2>Update Product</h2>
                    <div className='mb-3'>
                        <label htmlFor='name'>Name:</label>
                        <input type="text" id='name' placeholder='Enter Product Name' className='form-control' value={values.name}
                            onChange={e => setValues({ ...values, name: e.target.value })} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='price'>Price:</label>
                        <input type="number" id='price' placeholder='Enter Product Price' className='form-control' value={values.price}
                            onChange={e => setValues({ ...values, price: e.target.value })} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='category'>Category:</label>
                        <select className='form-control' value={values.category_id} onChange={e => setValues({ ...values, category_id: e.target.value })}>
                            <option value="">Select Category</option>
                            {categories.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className='btn btn-primary'>Update</button>
                    <Link to="/" className='btn btn-secondary m-4'>Cancel</Link>
                </form>
            </div>
        </div>
    );
}

export default Edit;