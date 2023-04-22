import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "../Styles/dashboard.css"
import useGetData from "../Custom-Hooks/useGetData"

const Dashboard = () => {

  const {data: products} = useGetData("products")
  const {data: users} = useGetData("User Profiles")

  return (
      <>
        <section>
          <Container>
            <Row>
              <Col lg="3">
                <div className="revenue__box">
                  <h5>Total Sales</h5>
                  <span>$7890</span>
                </div>
              </Col>
              <Col lg="3">
              <div className="order__box">
                  <h5>Total Orders</h5>
                  <span>78</span>
                </div>
              </Col>
              <Col lg="3">
              <div className="products__box">
                  <h5>Total Products</h5>
                  <span>{products.length}</span>
                </div>
              </Col>
              <Col lg="3">
              <div className="users__box">
                  <h5>Total Users</h5>
                  <span>{users.length}</span>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </>
   
  )
}

export default Dashboard