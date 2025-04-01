import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";  
import store from "./store/store"; 
import Home from './components/common/Home';
import Header from './components/Header';


function App() {


  return (
    <Provider store={store}>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home/>}/>
      </Routes>
  </BrowserRouter>
   </Provider>
  
  )
}

export default App
