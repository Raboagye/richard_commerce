import React, { useState } from 'react'
import Helmet from '../Components/Helmet/Helmet'
import { Col, Container, Form, FormGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "../Styles/login.css"

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <Helmet title={"Login"}>
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className='fw-bold mb-4'>Login</h3>
              <Form className='auth__form'>
                <FormGroup className='form__group'>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email'/>
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password'/>
                </FormGroup>
                <button type='submit' className='buy__button auth__button'>Login</button>
                <p>Don't have an account? <Link to="/signup">Create an account</Link></p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>

    </Helmet>
  )
}

export default Login