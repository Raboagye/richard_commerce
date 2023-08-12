import React from 'react'
import products from "../assets/data/products"
import { toast } from 'react-toastify'
import { addDoc, collection } from 'firebase/firestore'
import { db, storage } from '../firebase.config'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import { Container } from 'react-bootstrap'



const Addd = () => {

    const storageRef = ref(storage, "new new images/" + Date.now());

    const addThem = async (e) => {
        e.preventDefault()
        products.map(async (item) => {
            const upload = async () => {
                const imageBlob = await fetch(item.imgUrl).then((response) => response.blob());

                uploadBytes(storageRef, imageBlob).then(() => {
                    console.log("Image uploaded successfully");
                    toast.success("product successfully added")

                    getDownloadURL(storageRef).then((downloadURL) => {
                        console.log("File available at", downloadURL);

                        const docRef = collection(db, "products")
                        addDoc(docRef, {
                            productName: item.productName,
                            shortDesc: item.shortDesc,
                            description: item.description,
                            category: item.category,
                            price: item.price,
                            imgUrl: downloadURL,
                            reviews: item.reviews,
                            id: item.id,
                            avgRating: item.avgRating
                        })
                    });
                });
            }
            try {
                upload()
            } catch (error) {
                toast.error(error.message)
            }
        })
    }
   

    return (
        <section>
            <Container>
            <h2>Add</h2>
            <button className="btn btn-danger" onClick={addThem}> lets add</button>
            </Container>
            

        </section>
    )
}

export default Addd