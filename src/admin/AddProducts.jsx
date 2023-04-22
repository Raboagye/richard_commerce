import React, { useState } from 'react'
import { Col, Container, Form, FormGroup, Row } from 'react-bootstrap'
import { db, storage } from '../firebase.config'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { toast } from 'react-toastify'
import { addDoc, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const AddProducts = () => {

  const navigate = useNavigate()

  const [enterTitle, setEnterTitle] = useState("")
  const [enterShortDesc, setEnterShortDesc] = useState("")
  const [enterDescription, setEnterDescription] = useState("")
  const [enterCategory, setEnterCategory] = useState("")
  const [enterPrice, setEnterPrice] = useState("")
  const [enterProductImg, setEnterProductImg] = useState(null)
  const [loading, setLoading] = useState(false)


  const addProduct = async (e) => {

    const upload = async () => {
      const docRef = collection(db, "products")
      const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`)
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg)

      // always start with
      // uploadTask.on(() => {here can be empty}, () => {})


      uploadTask.on(() => {
        toast.error("images not uploaded")
      },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)

          await addDoc(docRef, {
            productName: enterTitle,
            shortDesc: enterShortDesc,
            description: enterDescription,
            category: enterCategory,
            price: enterPrice,
            imgUrl: downloadUrl
          })
          setLoading(false)
          console.log(downloadUrl)
          toast.success("product successfully added")
          navigate("/dashboard/all-products")

        })
    }

    e.preventDefault()
    setLoading(true)

      try {
        await upload()
      } catch(error) {
        toast.error(error.message)
      }
  }
  

  

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {
              loading ? (<h3 className='text-center'>Loading...</h3>) :
                <>
                  <h4 className='mb-5'>Add Product</h4>
                  <Form onSubmit={addProduct}>
                    <FormGroup className='form__group'>
                      <span>Product Title</span>
                      <input type='text' placeholder='Double sofa' value={enterTitle} onChange={(e) => setEnterTitle(e.target.value)} required />
                    </FormGroup>
                    <FormGroup className='form__group'>
                      <span>Short Description</span>
                      <input type='text' placeholder='lorem...' value={enterShortDesc} onChange={(e) => setEnterShortDesc(e.target.value)} required />
                    </FormGroup>
                    <FormGroup className='form__group'>
                      <span>Description</span>
                      <input type='text' placeholder='Description...' value={enterDescription} onChange={(e) => setEnterDescription(e.target.value)} required />
                    </FormGroup>

                    <div className='d-flex align-items-center justify-content-between gap-5'>
                      <FormGroup className='form__group w-50'>
                        <span>Price</span>
                        <input type='number' placeholder='100' value={enterPrice} onChange={(e) => setEnterPrice(e.target.value)} required />
                      </FormGroup>
                      <FormGroup className='form__group w-50'>
                        <span>Category</span>
                        <select className='w-100 p-2' value={enterCategory} onChange={(e) => setEnterCategory(e.target.value)} >
                          <option>Select Category</option>
                          <option value={"chair"}>Chair</option>
                          <option value={"sofa"}>Sofa</option>
                          <option value={"mobile"}>Mobile</option>
                          <option value={"watch"}>Watch</option>
                          <option value={"wireless"}>Wireless</option>
                        </select>
                      </FormGroup>
                    </div>

                    <div>
                      <FormGroup className='form__group'>
                        <span>Profile Image</span>
                        <input type='file' onChange={(e) => setEnterProductImg(e.target.files[0])} required />
                      </FormGroup>
                    </div>
                    <button className='buy__button' type='submit'>Add Product</button>
                  </Form>
                </>
            }
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AddProducts