import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Helmet from '../Components/Helmet/Helmet'
import CommonSection from '../Components/UI/CommonSection'
// import products from "../assets/data/products"
import { useParams } from 'react-router-dom'
import "../Styles/product__details.css"
import { motion } from 'framer-motion'
import ProductList from '../Components/UI/productList'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../Redux/Slices/cartSlice'
import { toast } from 'react-toastify'


const ProductDetails = () => {
  const reviewUser = useRef("")
  const reviewMsg = useRef("")
  const dispatch = useDispatch()
  const products = useSelector(state => state.products.products)

  const id = useParams().id

  const product = products?.find(item => item.id === id)

  const [tab, setTab] = useState("desc")
  const [rating, setRating] = useState(null)

  let imgUrl = null
  let description = null
  let productName = null
  let reviews = null
  let avgRating = null
  let price = null
  let shortDesc = null
  let category = null

  if (products.length) {
    imgUrl = product.imgUrl
    description =product.description
    productName = product.productName
    reviews = product.reviews
    avgRating = product.avgRating
    price = product.price
    shortDesc=product.shortDesc
    category = product.category
  }

  

  const relatedProducts = products?.filter((item) => item.category === category)

  const submitHandler = (e) => {
      e.preventDefault()

      const reviewUserName = reviewUser.current.value
      const reviewUserMsg = reviewMsg.current.value

      const reviewObj = {
        userName: reviewUserName,
        text: reviewUserMsg,
        rating,
      }

      console.log(reviewObj)
      toast.success("Review Submitted")

  }

 

  useEffect(()=>{
    window.scrollTo(0,0)
    console.log(product)
  }, [product])

  const addToCart = () => {
    dispatch(addItem({
      id,
      productName,
      image: imgUrl,
      price
    })
    )
    toast.success("product added successfully")
  }

  return (
    <Helmet title={productName}>
      <CommonSection title={productName}/>
      <section className='pt-0 mt-5'>
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt=""/>
            </Col>
            <Col lg="6">
              <div className='product__details'>
                <h2>{productName}</h2>
                <div className='product__rating d-flex align-items-center gap-5 mb-4 rating'>
                  <div>
                    <span ><i class="ri-star-s-fill"></i></span>
                    <span ><i class="ri-star-s-fill"></i></span>
                    <span ><i class="ri-star-s-fill"></i></span>
                    <span ><i class="ri-star-s-fill"></i></span>
                    <span ><i class="ri-star-half-s-fill"></i></span>
                  </div>
                  <p className='mb-1'>(<span>{avgRating}</span>ratings)</p>
                </div>
                <div className='d-flex align-items-center gap-5'>
                  <span className='product__price'>${price}</span>
                  <span>Category: {category?.toUpperCase()}</span>
                </div>
                <p className='mt-3 mb-0'>{shortDesc}</p>
                <motion.button whileTap={{scale: 1.2}} className='buy__button' onClick={addToCart}>Add to Cart</motion.button>
              </div>
            </Col>  
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6 className={`${tab === 'desc' ? 'active__tab': ''}`} onClick={()=>setTab("desc")}>Description</h6>
                <h6 className={`${tab === 'rev' ? 'active__tab': ''}`} onClick={()=>setTab("rev")}>Reviews ({reviews?.length})</h6>
              </div>
              {
                tab === "desc" ? <div className='tab__content mt-5'>
                  <p>{description}</p>
                </div> : <div className='product__review'>
                  <div className="review__wrapper">
                    <ul>
                      {
                        reviews.map((item, index) => (
                          <li key={index} className='my-4'>
                            <h6>Obeng Terry</h6>
                            <span>{item.rating} (rating)</span>
                            <p>{item.text}</p>
                          </li>
                        ))
                      }
                    </ul>
                    <div className="review__form">
                      <h4>Leave your experience</h4>
                      <form action="" onSubmit={submitHandler}>
                        <div className="form__group">
                          <input type="text" placeholder='Enter name' ref={reviewUser} required/>
                        </div>

                        <div className="form__group d-flex align-item-center rating__group">
                          <motion.span whileTap={{scale: 1.2}} onClick={() => setRating(1)}>1<i class="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{scale: 1.2}} onClick={() => setRating(2)}>2<i class="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{scale: 1.2}} onClick={() => setRating(3)}>3<i class="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{scale: 1.2}} onClick={() => setRating(4)}>4<i class="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{scale: 1.2}} onClick={() => setRating(5)}>5<i class="ri-star-s-fill"></i></motion.span>
                        </div>

                        <div className="form__group">
                          <textarea rows={4} placeholder='Review Message' ref={reviewMsg} required/>
                        </div>
                        <motion.button whileTap={{scale: 1.2}} className="buy__button">Submit</motion.button>
                      </form>
                    </div>
                  </div>
                </div>
              }
              
            </Col>
            <Col lg='12' className='mt-5'>
              <h2 className="related__title">You might also like</h2>
            </Col>
            <ProductList data={relatedProducts}/>
          </Row>
        </Container>
      </section>
    </Helmet>
    
  )
}

export default ProductDetails 