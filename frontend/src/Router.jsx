"use client"

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login'
import Dashboard from './pages/Dashboard'


const Router = () => {
  return (

    <BrowserRouter>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/login' element={<Login />} />
                <Route path='/dashboard' element={<Dashboard />} />
                {/* Adiciona do mesmo jeito aqui outras páginas */}
            </Routes>
    </BrowserRouter>
  )
}

export default Router