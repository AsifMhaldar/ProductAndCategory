import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import Create from "./Create";
import Read from "./Read";
import Category from "./Category";
import AddCategory from "./AddCategory";
import Edit from "./Edit";
import EditCategory from "./EditCategory";

function App() {
    return(
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/AddCategory" element={<AddCategory />} />
        <Route path="/editCategory/:id" element={<EditCategory />} />
        <Route path="/create" element={<Create />} />
        <Route path="/products/:id" element={<Read />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
      </BrowserRouter>
    )
}

export default App
