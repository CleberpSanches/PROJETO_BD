"use client"

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login'
import Dashboard from './pages/Dashboard'
import Agendamentos from './pages/Agendamentos';
import Colaboradores from './pages/Colaboradores'


const Router = () => {
  return (

    <BrowserRouter>
            <Routes>
                <Route path='/' element={<Agendamentos />} />
                <Route path='/login' element={<Login />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/agendamentos' element={<Agendamentos />} />
                <Route path='/colaboradores' element={<Colaboradores />} />
                {/* Adiciona do mesmo jeito aqui outras páginas */}
            </Routes>
    </BrowserRouter>
  )
}

export default Router