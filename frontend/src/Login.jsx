import React from 'react'

const Login = () => {
  return (
    <div className='flex min-h-screen bg-orange-50'>
      {/* Lado esquerdo - Imagem de fundo */}
      <div 
        className="w-1/2 min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/src/imgs/signimg.png')" }}
      >
        <div className="relative z-10 h-full flex justify-end p-5">
          <a className='text-white text-sm font-regular text-right px-8 border-b border-white'>
            Sou Cliente
          </a>
          <a className='text-white text-sm font-regular text-right px-8'>
            Sou Colaborador
          </a>
        </div>
      </div>

      {/* Lado direito - Formulário de login */}
      <div className='p-5 w-1/2 justify-center items-center flex flex-col gap-6'>
        <img src='/src/imgs/Glamsync.png' width="256px"></img>
        <input type='name' placeholder='Usuário' className='p-4 rounded-sm border bg-transparent'/>
        <input type='password' placeholder='Senha' className='p-4 rounded-sm border bg-transparent' />
        <a className='font-bold text-orange-700 text-sm text-right' >Esqueceu a senha?</a>
        <button className='bg-orange-700 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded-full mt-4'>
          <a>
            Enta
          </a>
        </button>
      </div>
    </div>
  )
}

export default Login