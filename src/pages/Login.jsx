import React, { useState } from 'react'
import Helmet from '../Components/Helmet/Helmet'
import { Col, Container, Form, FormGroup, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.config'
import "../Styles/login.css"
import {toast} from "react-toastify"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { login } from '../Redux/Slices/userSlice'

const Login = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const signIn = async(e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      
      dispatch(login({
        userName: user.displayName,
        photoURL: user.photoURL,
        email: user.email
      }))

      console.log(user)
      setLoading(false)
      toast.success("Successfully Logged In")
      navigate("/checkout")

    } catch (error) {
      setLoading(false)
      toast.error(error.message)
    }
  }

  return (
    <Helmet title={"Login"}>
      <section>
        <Container>
          <Row>
            {
              loading ? <Col lg="12"><h3 className='text-center fw-bold'>Loading...</h3></Col> : (
                <Col lg="6" className="m-auto text-center">
                  <h3 className='fw-bold mb-4'>Login</h3>
                  <Form className='auth__form' onSubmit={signIn}>
                    <FormGroup className='form__group'>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' />
                    </FormGroup>
                    <FormGroup className='form__group'>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' />
                    </FormGroup>
                    <button type='submit' className='buy__button auth__button'>Login</button>
                    <p>Don't have an account? <Link to="/signup">Create an account</Link></p>
                  </Form>
                </Col>
              )
            }
          </Row>
        </Container>
      </section>

    </Helmet>
  )
}

export default Login