import React, { useEffect } from 'react';
import './App.css';
import Layout from './Components/Layout/Layout';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.config';
import { login, logout } from './Redux/Slices/userSlice';
import { pushProducts } from './Redux/Slices/productsSlice';
import useGetData from './Custom-Hooks/useGetData';

function App() {
  const dispatch = useDispatch()

  const {product: products} =useGetData("products")


  // useEffect(() => {

  //   onAuthStateChanged(auth, (userAuth) => {
  //     if (userAuth) {
  //       dispatch(pushProducts(products))
  //       dispatch(login({
  //         userName: userAuth.displayName,
  //         photoURL: userAuth.photoURL,
  //         email: userAuth.email
  //       }))

        
  //     } else {
  //       dispatch(logout())
  //       dispatch(pushProducts(products))
  //     }
  //   })

  //   dispatch(pushProducts(products))
  // }, [])

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(login({
          userName: userAuth.displayName,
          photoURL: userAuth.photoURL,
          email: userAuth.email
        }))
      } else {
        dispatch(logout())
      }
      dispatch(pushProducts(products))
    })
  
    return unsubscribe
  }, [products])
  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
