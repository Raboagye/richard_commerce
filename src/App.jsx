import React, { useEffect } from 'react';
import './App.css';
import Layout from './Components/Layout/Layout';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.config';
import { login, logout } from './Redux/Slices/userSlice';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(login({
          userName: userAuth.displayName,
          photoURL: userAuth.photoURL,
          email: userAuth.email
        }))
      } else {
        dispatch(logout())
      }
    })
  }, [])
  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
