import React, { useEffect, useRef } from 'react'
import "./Header.css"
import { Container, Row } from 'react-bootstrap'
import logo from "../../assets/images/eco-logo.png"
import userIcon from "../../assets/images/user-icon.png"
import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'


const Header = () => {

    const headerRef = useRef(null)
    const totalQuantity = useSelector((state) => state.cart.totalQuantity)

    const menuRef = useRef(null)
    const navigate = useNavigate()

    const navigateToCart = () => {
        navigate("/cart")
    }

    const stickyHeaderFunc = () => {
        window.addEventListener("scroll", ()=> {
            if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add("sticky__header")
            } else {
                headerRef.current.classList.remove("sticky__header")
            }
        })
    }

    useEffect(() => {
     stickyHeaderFunc()  

     return () => window.removeEventListener("scroll", stickyHeaderFunc)

    })

    const menuToggle = () => menuRef.current.classList.toggle("active__menu")
    
  return (
    <header className="header" ref={headerRef} >
        <Container>
            <Row>
                <div className="nav__wrapper">
                    <div className="logo">
                        <img src={logo} alt="" />
                        <div>
                            <h1>Multimart</h1>
                        </div>
                    </div>
                    <div className="navigation" ref={menuRef} onClick={menuToggle}>
                        <ul className="menu">
                            <li className="nav__item">
                                <NavLink to="home" className={(navClass) => navClass.isActive? "nav__active" : "not__active"}>Home</NavLink>
                            </li>
                            <li className="nav__item">
                                <NavLink to="shop" className={(navClass) => navClass.isActive? "nav__active" : "not__active"}>Shop</NavLink>
                            </li>
                            <li className="nav__item">
                                <NavLink to="cart" className={(navClass) => navClass.isActive? "nav__active" : "not__active"}>Cart</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="nav__icons">
                        <span className='fav__icon'>
                            <i class="ri-heart-line"></i>
                            <span className="barge">1</span>
                        </span>
                        
                        <span className="cart__icon" onClick={navigateToCart}>
                            <i class="ri-shopping-bag-line"></i>
                            <div className="barge">{totalQuantity}</div>
                        </span>
                        <span>
                              <motion.img whileTap={{ scale: 1.2 }} src={userIcon} />
                          </span>
                          <div className="mobile__menu">
                              <span onClick={menuToggle}>
                                  <i class="ri-menu-line"></i>
                              </span>
                          </div>
                      </div>
                    
                </div>
            </Row>
        </Container>
    </header>
  )
}

export default Header