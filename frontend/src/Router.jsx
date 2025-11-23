"use client"

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login'
import Dashboard from './pages/Dashboard'
import Agendamentos from './pages/Agendamentos';
import Colaboradores from './pages/Colaboradores'
import Financeiro from './pages/Financeiro';
import Estoque from './pages/Estoque';

const Router = () => {
  return (

    <BrowserRouter>
            <Routes>
                <Route path='/' element={<Financeiro />} />
                <Route path='/login' element={<Login />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/agendamentos' element={<Agendamentos />} />
                <Route path='/colaboradores' element={<Colaboradores />} />
                <Route path='/financeiro' element={<Financeiro />} />
                <Route path='/estoque' element={<Estoque />} />
                {/* Adiciona do mesmo jeito aqui outras páginas */}
            </Routes>
    </BrowserRouter>
  )
}

export default Router