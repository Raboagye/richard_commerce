import React, { useEffect, useRef, useState } from 'react'
import "./Header.css"
import { Container, Row } from 'react-bootstrap'
import logo from "../../assets/images/eco-logo.png"
import userIcon from "../../assets/images/user-icon.png"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { auth } from '../../firebase.config'
import { signOut } from 'firebase/auth'
import { toast } from 'react-toastify'



const Header = () => {

    const currentUser = useSelector(state => state.user.user)

    const headerRef = useRef(null)
    const totalQuantity = useSelector((state) => state.cart.totalQuantity)

    const menuRef = useRef(null)
    const profileActionsRef = useRef(null)
    const navigate = useNavigate()

    const [toggleOptions, setToggleOptions] = useState(false)

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

    const logout = () => {
        signOut(auth).then(() => {
            toast.success("Logged out")
            navigate("/home")
            profileToggle()
        }).catch(error => toast.error(error.message))
    }

    useEffect(() => {
     stickyHeaderFunc()  

     return () => window.removeEventListener("scroll", stickyHeaderFunc)

    })

    const menuToggle = () => menuRef.current.classList.toggle("active__menu")

    // const profileToggle = () => profileActionsRef.current.classList.toggle("show__profileActions")
    const profileToggle = () => setToggleOptions(!toggleOptions)

    useEffect(() => {
        const clickHandler = (e) => {
            if (!profileActionsRef.current.contains(e.target)) {
                setToggleOptions(false)
            }
        }
        document.addEventListener("click", clickHandler)

        return () => {
            document.removeEventListener("click", clickHandler)
        }
    })
    
  return (
    <header className="header" ref={headerRef} >
        <Container>
              <Row>
                  <div className="nav__wrapper">
                      <div className="logo">
                          <img src={logo} alt="" />
                          <div>
                              <h1 onClick={()=> navigate("/home")}>Multimart</h1>
                          </div>
                      </div>
                      <div className="navigation" ref={menuRef} onClick={menuToggle}>
                          <ul className="menu">
                              <li className="nav__item">
                                  <NavLink to="home" className={(navClass) => navClass.isActive ? "nav__active" : "not__active"}>Home</NavLink>
                              </li>
                              <li className="nav__item">
                                  <NavLink to="shop" className={(navClass) => navClass.isActive ? "nav__active" : "not__active"}>Shop</NavLink>
                              </li>
                              <li className="nav__item">
                                  <NavLink to="cart" className={(navClass) => navClass.isActive ? "nav__active" : "not__active"}>Cart</NavLink>
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
                          <div className='profile' ref={profileActionsRef}>
                              <motion.img whileTap={{ scale: 1.2 }} src={(currentUser && currentUser.photoURL)? currentUser.photoURL : userIcon} onClick={profileToggle} />

                              {
                                toggleOptions && (
                                    <div className={'profile__actions'} >
                                  {

                                      currentUser ? <span onClick={logout}>logout</span> : <div>
                                          <span onClick={profileToggle}><Link to={"/signup"}>Signup</Link></span>
                                          <span onClick={profileToggle}><Link to={"/login"}>Login</Link></span>
                                      </div>
                                  }

                              </div>
                                )
                              }
                              

                          </div>
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