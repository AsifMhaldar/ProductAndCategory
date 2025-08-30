import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // <-- import useNavigate
import axios from 'axios';

function AddCategory() {
    const [categories, setCategories] = React.useState([]);
    const [values, setValues] = React.useState({
        name: '',
        description: ''
    });

    const navigate = useNavigate(); // <-- use the hook

    React.useEffect(() => {
        axios.get('http://localhost:8081/categories')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/categories', values)
        .then((response) => {
            console.log(response.data);
            navigate('/category');
        })
        .catch((error) => {
            console.error("Error creating category:", error);
        });
    }

    return (
        <div className='d-flex justify-content-center align-items-center min-vh-100'>
            <div className='bg-white p-4 rounded'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Category</h2>
                    
                    <div className='mb-3'>
                        <label htmlFor='name'>Name:</label>
                        <input type="text" id='name' placeholder='Enter Category Name' className='form-control'
                        onChange={e => setValues({...values, name: e.target.value})}/>
                    </div>

                    
                    <button type="submit" className='btn btn-primary'>Add Category</button>
                    <Link to="/category" className='btn btn-secondary m-4'>Cancel</Link>
                </form>
            </div>
        </div>
    );
}
export default AddCategory;