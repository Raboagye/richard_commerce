import React, { useEffect } from 'react'
import "../Styles/cart.css"
import Helmet from '../Components/Helmet/Helmet'
import CommonSection from '../Components/UI/CommonSection'
import { Col, Container, Row } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { deleteItem } from '../Redux/Slices/cartSlice'
import { Link } from 'react-router-dom'


const Cart = () => {

  const cartItems = useSelector(state => state.cart.cartItems)
  const totalAmount = useSelector(state => state.cart.totalAmount)

  useEffect(()=>{
    window.scrollTo(0,0)
  }, [])

  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart"/>
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {
                cartItems.length === 0 ? (<h2 className='fs-4 text-center'>No Item added to the cart</h2>) : (
                  <table className='table bordered'>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        cartItems.map((item, index) => (
                          <Tr item={item} key={index}/>
                        ))
                      }
                    </tbody>
                  </table>
                )
              } 
            </Col>
            <Col lg="3">
              <div>
                <h6 className='d-flex align-items-center justify-content-between'>
                  Subtotal<span className='fs-4 fw-bold'>${totalAmount}</span>
                </h6>
              </div>

              <p className='fs-6 mt-2'>Taxes and Shipping will be calculated in the checkout page</p>

              <div>
                <Link to="/checkout" className='link'>
                  <motion.button whileTap={{ scale: 1.1 }} className='buy__button w-100'>Checkout</motion.button>
                </Link>

                <Link to="/shop" className='link'>
                  <motion.button whileTap={{ scale: 1.1 }} className='buy__button w-100 mt-3'>Continue Shopping</motion.button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

const Tr = ({item}) => {

  const dispatch = useDispatch()

  const deleteproduct = () => {
    dispatch(deleteItem(item.id))
  }

  return (
    <tr>
      <td><img src={item.image} alt="" /></td>
      <td>{item.productName}</td>
      <td>${item.price}</td>
      <td>{item.quantity}</td>
      <td><motion.i whileTap={{ scale: 1.2 }} class="ri-delete-bin-line" onClick={deleteproduct}></motion.i ></td>
    </tr>
  )
}

export default Cart