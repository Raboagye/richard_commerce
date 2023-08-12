import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Helmet from '../Components/Helmet/Helmet'
import CommonSection from '../Components/UI/CommonSection'
import "../Styles/shop.css"
import products from '../assets/data/products'
import ProductList from '../Components/UI/productList'


const Shop = () => {

  const [productData, setProductData] = useState(products)

  const handleSearch = (e) => {
    const searchedTerm = e.target.value
    const searchedProducts = products.filter((item) => item.productName.toLowerCase().includes(searchedTerm.toLowerCase())) 
    setProductData(searchedProducts)
  }


  useEffect(()=>{
    window.scrollTo(0,0)
  }, [])


  const handleFilter = (e) => {
    const filterValue = e.target.value

    if (filterValue === "sofa") {
      const filteredProducts = products.filter((item)=> item.category === "sofa")
      setProductData(filteredProducts)
    }
    if (filterValue === "mobile") {
      const filteredProducts = products.filter((item)=> item.category === "mobile")
      setProductData(filteredProducts)
    }
    if (filterValue === "chair") {
      const filteredProducts = products.filter((item)=> item.category === "chair")
      setProductData(filteredProducts)
    }
    if (filterValue === "wireless") {
      const filteredProducts = products.filter((item)=> item.category === "wireless")
      setProductData(filteredProducts)
    }
    if (filterValue === "watch") {
      const filteredProducts = products.filter((item)=> item.category === "watch")
      setProductData(filteredProducts)
    }
    if (filterValue === "Filter by category") {
      setProductData(products)
    }
  }
  
  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />
      <section>
        <Container>
          <Row>
            <Col lg="3" md="6" xs="6">
              <div className="filter__widgets">
                <select onChange={handleFilter} name="" id="">
                  <option>Filter by category</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="6" xs="6" className='text-end'>
              <div className='filter__widgets'>
                <select>
                  <option>Sort by</option>
                  <option value="ascending">ascending</option>
                  <option value="descending">descending</option>
                </select>
              </div>
              
            </Col>
            <Col lg="6" md="12">
              <div className='search__box'>
                <input onChange={handleSearch} type="text" placeholder='Search...' />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='pt-0'>
        <Container>
          <Row>
            {
              productData.length === 0? <h1 className='text-center fs-4'>No products are found!</h1> : <ProductList data={productData}/>
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Shop