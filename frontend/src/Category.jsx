import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';



function Category() {

    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch category data from API
        axios.get('http://localhost:8081/categories')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/categories/${id}`)
            .then((response) => {
                console.log("Category deleted successfully:", response.data);
                setData(data.filter(item => item.id !== id));
            })
            .catch((error) => {
                console.error("Error deleting category:", error);
        });
    }

    

    return (
        <div className='d-flex justify-content-center align-items-center min-vh-100 p-3'>
            <div className='bg-white p-4 rounded'>

                <div className='d-flex justify-content-between align-items-center mb-4'>
                    <h2 className='mb-0'>Category Master</h2>
                    
                </div>
                
                <Link to="/" className='btn btn-secondary'>Go to Products</Link>
                <Link to="/AddCategory" className='btn btn-primary mx-5'>+ Add Category</Link>

                <table className='table'>
                        <thead>
                            <tr>
                                <th>Category ID</th>
                                <th>Category Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <Link to={`/editCategory/${item.id}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                                        <button onClick={() => handleDelete(item.id)} className='btn btn-sm btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
            </div>
        </div>
    )
}

export default Category