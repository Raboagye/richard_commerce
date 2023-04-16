import React from 'react'
import { motion } from 'framer-motion'
import "../../Styles/productCard.css"
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addItem } from '../../Redux/Slices/cartSlice'
import { toast } from 'react-toastify';


const ProductCard = ({item}) => {

  const dispatch = useDispatch()

  const addToCart = () => {
    dispatch(addItem({
      id : item.id,
      productName : item.productName,
      price : item.price,
      image : item.imgUrl
    }))

    toast.success("Product added successfully")
  }

  return (
    <Col lg="3" md="4" >
      <div className="product__item">
        <div className="product__image">
          <Link to={`/shop/${item.id}`}><motion.img src={item.imgUrl} whileHover={{ scale: 0.9 }} alt="" /></Link>
          <div className="product__info p-2">
            <h3 className="product__name"><Link to={`/shop/${item.id}`}>{item.productName}</Link></h3>
            <span>{item.category}</span>
          </div>
          <product className="product__card-bottom d-flex justify-content-between p-2 align-items-center">
            <span className="price">${item.price}</span>
            <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}><i class="ri-add-line"></i></motion.span>
          </product>
        </div>
      </div>
    </Col>
  )
}

export default ProductCard