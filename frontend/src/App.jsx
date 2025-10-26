import React from 'react'
import { BrowserRouter,Route, Routes} from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Contact from './Pages/Contact.jsx'
import Nav from './Components/Nav.jsx'
import Footer from './Components/Footer.jsx'
import Login from './Pages/Login.jsx'
import Items from './Pages/Product.jsx'
import Product from './Pages/Product.jsx'
import Cart from './Pages/Cart.jsx'
import Order from './Pages/Order.jsx'
import Summary from './Pages/Summary.jsx'

function App() {
  return (
    
      <Routes>
        <Route path='/'        element={<Home/>} />
        <Route path='/Contact' element={<Contact/>} />
        <Route path='/login'   element={<Login/>} />
        <Route path='/product' element={<Product/>} />
        <Route path='/ToCart'  element={<Cart/>} />
        <Route path='/order'   element={<Order/>}/>
        <Route path='/summary' element={<Summary/>} />
      </Routes>

   )
}

export default App