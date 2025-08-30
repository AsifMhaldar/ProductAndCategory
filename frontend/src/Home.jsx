import React from 'react'
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = data.slice(firstIndex, lastIndex);
    const nPages = Math.ceil(data.length / recordsPerPage);
    const numbers = [...Array(nPages).keys()].map(num => num + 1);

    useEffect(() => {
        axios.get('http://localhost:8081/')
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, []);

    const handleDelete = (id) =>{
        axios.delete(`http://localhost:8081/delete/${id}`)
        .then((response) => {
            setData(data.filter(item => item.id !== id));
        })
        .catch((error) => {
            console.error("Error deleting product:", error);
        });
    }

    // Move these functions inside the component
    const prevPage = (e) => {
        e.preventDefault();
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const nextPage = (e) => {
        e.preventDefault();
        if (currentPage < nPages) setCurrentPage(currentPage + 1);
    };

    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='d-flex justify-content-center align-items-center min-vh-100 p-3'>
            <div className='bg-white p-4 rounded'>
                <Link to="/category" className="btn btn-primary">Category</Link>
                <h2>Products Master</h2>
                <div className='d-flex justify-content-end mb-3'>
                    <Link to="/create" className="btn btn-primary">+ Add Product</Link>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.category}</td>
                                <td>
                                    <Link to={`/products/${item.id}`} className='btn btn-sm btn-info '>Read</Link>
                                    <Link to={`/edit/${item.id}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                                    <button onClick={() => handleDelete(item.id)} className='btn btn-sm btn-danger'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav>
                    <ul className='pagination'>
                        <li className='page-item'>
                            <a href='#' className='page-link' onClick={prevPage}>
                                Prev
                            </a>
                        </li>
                        {
                            numbers.map((number, i) => (
                                <li className={`page-item ${currentPage === number ? 'active' : ''}`} key={i}>
                                    <a href='#' className='page-link' onClick={() => changePage(number)}>
                                        {number}
                                    </a>
                                </li>
                            ))
                        }

                        

                        <li className='page-item'>
                            <a href='#' className='page-link' onClick={nextPage}>
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Home;