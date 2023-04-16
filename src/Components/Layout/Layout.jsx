import React from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Routers from '../../Routers/Router'

const Layout = () => {
  return <>
    <Header />
    <div>
        <Routers />
    </div>
    <Footer />
  </>
}

export default Layout