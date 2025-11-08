import React from 'react';
import { useLocation } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = () => {
  const location = useLocation();

  // Função para verificar se o botão está ativo
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className='w-1/4 h-screen p-6 border-r border-r-slate-400'>
      {/* profile */}
      <div id='perfildeusuário' className='flex gap-4 align-middle items-center '>
        <img src='/src/imgs/pfp.png' width='48px' alt='Profile'/>
        <div>
          <p className='text-xs font-semibold'>João Pessoa Valensky</p>
          <p className='text-xs font-light'>Administrador</p>
        </div>
        <a href='/login'>
          <i className="bi bi-box-arrow-right font-semibold"></i>
        </a>
      </div>

      <hr className='border-slate-400 my-4'/>

      {/* search & notifications */}
      <div className='gap-4 align-middle items-center'>
        <button 
          id='pesquisa' 
          className={`flex gap-6 transition-colors duration-100 ${
            isActive('/search') ? 'text-black font-semibold' : 'text-gray-600 hover:text-black'
          }`}
        >
          <i className="bi bi-search"></i>
          <p>Pesquisar</p>
        </button>
        <button 
          id='notificações' 
          className={`flex gap-6 transition-colors duration-100 ${
            isActive('/notifications') ? 'text-black font-semibold' : 'text-gray-600 hover:text-black'
          }`}
        >
          <i className="bi bi-bell-fill"></i>
          <p>Notificações</p>
        </button>
      </div>

      <hr className='border-slate-400 my-4'/>

      {/* system navigation */}
      <div className='gap-4 align-middle items-center'>
        <a href='/dashboard'>
          <button 
          id='dashboard' 
          className={`flex gap-6 transition-colors duration-100 ${
            isActive('/dashboard') ? 'text-black font-semibold' : 'text-gray-600 hover:text-black'
          }`}
          >
            <i className="bi bi-columns-gap"></i>
            <p>Dashboard</p>

          </button>
        </a>

        <a href='/agendamentos'>
          <button id='agendamentos' className={`flex gap-6 transition-colors duration-100 ${
            isActive('/agendamentos') ? 'text-black font-semibold' : 'text-gray-600 hover:text-black'
          }`}>
            <i class="bi bi-calendar-event"></i>
            <p>Agendamentos</p>
          </button>
        </a>

        <button 
          id='colaboradores' 
          className={`flex gap-6 transition-colors duration-100 ${
            isActive('/colaboradores') ? 'text-black font-semibold' : 'text-gray-600 hover:text-black'
          }`}
        >
          <i className="bi bi-person-badge"></i>
          <p>Colaboradores</p>
        </button>
        <button 
          id='finances' 
          className={`flex gap-6 transition-colors duration-100 ${
            isActive('/financeiro') ? 'text-black font-semibold' : 'text-gray-600 hover:text-black'
          }`}
        >
          <i className="bi bi-cash"></i>
          <p>Financeiro</p>
        </button>
        <button 
          id='stock' 
          className={`flex gap-6 transition-colors duration-100 ${
            isActive('/estoque') ? 'text-black font-semibold' : 'text-gray-600 hover:text-black'
          }`}
        >
          <i className="bi bi-inboxes"></i>
          <p>Estoque</p>
        </button>
      </div>

      <hr className='border-slate-400 my-4'/>

      {/* settings & support */}
      <div className='gap-4 align-middle items-center'>
        <button 
          id='settings' 
          className={`flex gap-6 transition-colors duration-100 ${
            isActive('/configuracoes') ? 'text-black font-semibold' : 'text-gray-600 hover:text-black'
          }`}
        >
          <i className="bi bi-gear"></i>
          <p>Configurações</p>
        </button>
        <button 
          id='support' 
          className={`flex gap-6 transition-colors duration-100 ${
            isActive('/suporte') ? 'text-black font-semibold' : 'text-gray-600 hover:text-black'
          }`}
        >
          <i className="bi bi-question-circle"></i>
          <p>Suporte</p>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;