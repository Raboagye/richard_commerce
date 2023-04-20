import React from 'react'
import Home from "../pages/Home"
import Cart from "../pages/Cart"
import Checkout from "../pages/Checkout"
import Login from "../pages/Login"
import ProductDetails from "../pages/ProductDetails"
import Shop from "../pages/Shop"
import Signup from "../pages/Signup"
import { Navigate, Route, Routes } from 'react-router-dom'
import {  useSelector } from 'react-redux'


const Routers = () => {

  const userLogin = useSelector(state => state.user.user)
  

  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="/home" element={ <Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={userLogin? <Checkout /> : <Navigate to="/login"/>} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="shop/:id" element={<ProductDetails />} />
    </Routes>

  )
}

export default Routers