import React from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import "./Footer.css"
import { Link } from 'react-router-dom'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col lg="4" className='mb-4' md="6">
            <div className="logo">
              <div>
                <h1 className='text-white'>Multimart</h1>
              </div>
            </div>
            <p className="footer__text mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo modi eveniet earum fuga beatae aspernatur dolorum vel. Atque, perspiciatis debitis.
            </p>
          </Col>

          <Col lg="3" className='mb-4' md="3">
            <div className="footer__quick-links">
              <h4 className="quick__links-title">Top Categories</h4>
              <ListGroup className='mb-3'>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to="#" className='text-decoration-none link'>Mobile Phones</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to="#" className='text-decoration-none link'>Modern Sofa</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to="#" className='text-decoration-none link'>Arm Chair</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to="#" className='text-decoration-none link'>Smart Watches</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          
          </Col>

          <Col lg="2" className='mb-4' md="3">
            <div className="footer__quick-links ">
              <h4 className="quick__links-title" >Useful Links</h4>
              <ListGroup className='mb-3' >
                <ListGroupItem className='ps-0 border-0 '>
                  <Link to="/shop" className='text-decoration-none'>Shop</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to="/cart" className='text-decoration-none'>Cart</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to="/login" className='text-decoration-none'>Login</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to="#" className='text-decoration-none'>Privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg="3" md="4">
          <div className="footer__quick-links">
              <h4 className="quick__links-title">Contact</h4>
              <ListGroup className='mb-3'>
                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                  <span><i class="ri-map-pin-line"></i></span>
                  <p className='m-0'>123 Nyameso, Obuasi-Ashanti, Ghana</p>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2 mt-3 mb-2'>
                  <span><i class="ri-phone-line"></i></span>
                  <p className='m-0'>+2335498472</p>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                <span><i class="ri-mail-line"></i></span>
                  <p className='m-0'>www.richardaboagye100@gmail.com</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="12">
            <p className="footer__copyright">Copyright {year} developed by Richard Aboagye. All rights reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer