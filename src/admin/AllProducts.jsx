import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import useGetData from '../Custom-Hooks/useGetData'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

const AllProducts = () => {

  const {data: productsdata, loading} = useGetData("products")

  //the same as const productsdata = useGetData("products").data

  console.log(productsdata, loading)

  const deleteProduct = (id) => {
    deleteDoc(doc(db, "products", id))
    toast.success("Deleted!")
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className='d-flex justify-content-center'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              
                {loading ? <h4 className='py-5 fw-bold' >Loading...</h4> : (

                  productsdata.map((item) => (
                    <tr>
                      <td><img src={item.imgUrl} alt="" /></td>
                      <td>{item.productName}</td>
                      <td>{item.category}</td>
                      <td>${item.price}</td>
                      <td><button className='btn btn-danger' onClick={()=>{deleteProduct(item.id)}}>Delete</button></td>
                      {/* {console.log(item)} */}
                    </tr>

                  ))
                )}

              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AllProducts