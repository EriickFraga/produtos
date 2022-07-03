import { BrowserRouter, Routes, Route } from 'react-router-dom'

import React from 'react'
import Navbar from '../components/Navbar'
import Home from '../pages/home/Home'
import Register from '../pages/products/Register'
import AllProducts from '../pages/products/AllProducts'

const Rotas = () => {
   return (
      <BrowserRouter>
         <Navbar />
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cadastro-produtos' element={<Register />} />
            <Route path='/cadastro-produtos/:sku_code_param' element={<Register />} />
            <Route path='/produtos' element={<AllProducts />} />
         </Routes>
      </BrowserRouter>
   )
}

export default Rotas