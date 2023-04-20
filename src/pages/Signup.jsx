import React, { useState } from 'react'
import Helmet from '../Components/Helmet/Helmet'
import { Col, Container, Form, FormGroup, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import "../Styles/login.css"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage"
import { setDoc, doc } from 'firebase/firestore'

import { auth } from '../firebase.config'
import { storage } from "../firebase.config"
import { db } from "../firebase.config"

import { toast } from "react-toastify"
import { login } from '../Redux/Slices/userSlice'
import { useDispatch } from 'react-redux'


const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const upload = async () => {

    setLoading(true)

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)
      const imageRef = ref(storage, `new Imaes/${username}`)
      
      let uploadLink 

      if(file) {
        uploadLink = await uploadBytes(imageRef, file).then(() => getDownloadURL(imageRef))
      }else {
        uploadLink = ""
      }
      
      await updateProfile(user.user, {
        displayName: username,
        photoURL: uploadLink,
      })
      console.log(user)
      console.log(uploadLink)

      dispatch(login({
        userName: username,
        email: email,
        photoURL: uploadLink
      }))

      const storeData = async () => {
        await setDoc(doc(db, "User Profiles", user.user.uid), {
          name: username,
          email: email,
          photoURL: uploadLink,
          uid: user.user.uid
        })
      }

      await storeData()
      setLoading(false)
      navigate("/checkout")
      toast.success("account created")
    }
      catch (error) {
        toast.error(error.message)
    }
      setLoading(false)

  }


  const signUp = (e) =>{
    e.preventDefault()
    upload()
  }

  return (
    <Helmet title={"Signup"}>
      <section>
        <Container>
          <Row>
            {loading ? <Col lg="12"><h3 className='text-center fw-bold'>Loading...</h3></Col> : (
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
            )}
          </Row>
        </Container>
      </section>

    </Helmet>
  )
}

export default Signup