import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase.config'

const useGetData = (collectionName) => {

    const [data, setData] = useState([])
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const collectionRef = collection(db, collectionName)


    
    // // Updates when you refresh
    // useEffect(() => {
    //     const getData = async () => {
    //         const data = await getDocs(collectionRef)
    //         setData(data.docs.map(doc => ({...doc.data(), id: doc.id})));
    //         setLoading(false)
    //     };

    //     getData()
    // }, [])


    // // Realtime refresh 
    useEffect(() => {
        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
          const updatedData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setData(updatedData);
          setLoading(false);

          const updatedProduct = snapshot.docs.map((doc) => ({
            ...doc.data(),
            uid: doc.id,
          }));
          setProduct(updatedProduct);

        });
      
        // Cleanup function to unsubscribe from the snapshot listener
        return () => unsubscribe();
      }, []);



    // OR
    // // Real-time refresh
    // useEffect(() => {

    //     onSnapshot(collection(db, collectionName), (snapshot) => {
    //         setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    //         setLoading(false)
    //     })

    // }, [])




  return {data, product, loading}
}

export default useGetData