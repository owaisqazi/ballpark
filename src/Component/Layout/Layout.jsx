import React, { useState } from 'react'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import Form from './Header/Form'


const Layout = ({ children}) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);  
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
    <Header handleShow={handleShow} /> 
    <main>
    {children}
    </main>
    <Footer/> 
    <Form show={show} handleClose={handleClose} setShow={setShow}/>
    </>
  )
}

export default Layout