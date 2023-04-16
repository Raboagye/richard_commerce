import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'remixicon/fonts/remixicon.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import store from './Redux/Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      closeOnClick
      pauseOnHover={false}
      theme="dark"
    />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
</React.StrictMode>,
)
