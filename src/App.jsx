import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";  
import store from "./store/store"; 
import Home from './components/common/Home';
import Header from './components/Header';
import ProductDetail from './components/common/ProductDetail';
import EditProduct from './components/common/EditProduct';
import AddProduct from './components/common/AddProduct';

function App() {


  return (
    <Provider store={store}>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/:categoryName" element={<Home />}/>
      <Route path="/product/:id" element={<ProductDetail/>}/>
      <Route path="/edit/:id" element={<EditProduct />} />
      <Route path="/add-product" element={<AddProduct />} />
      </Routes>
  </BrowserRouter>
   </Provider>
  
  )
}

export default App
