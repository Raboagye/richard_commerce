import React, { useState } from 'react'
import Helmet from '../Components/Helmet/Helmet'
import { Col, Container, Form, FormGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "../Styles/login.css"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import { setDoc, doc } from 'firebase/firestore'

import { auth } from '../firebase.config'
import {storage} from "../firebase.config"
import {db} from "../firebase.config"

import {toast} from "react-toastify"


const Signup = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const signUp = async(e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      console.log(user)

    }catch (error) {
      
    }
  }
  

  return (
    <Helmet title={"Signup"}>
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className='fw-bold mb-4'>Sign Up</h3>
              <Form className='auth__form' onSubmit={signUp}>
                <FormGroup className='form__group'>
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="file" onChange={(e) => setFile(e.target.files[0])} placeholder='Enter your password' />
                </FormGroup>
                <button type='submit' className='buy__button auth__button'>Create an Account</button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>

    </Helmet>
  )
}

export default Signup