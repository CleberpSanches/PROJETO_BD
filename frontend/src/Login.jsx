import { Link } from "react-router-dom"

const Login = () => {
  return (
    <div className='flex min-h-screen bg-orange-50'>
      {/* Lado esquerdo - Imagem de fundo */}
      <div 
        className="w-1/2 min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/src/imgs/signimg.png')" }}
      >
        <div className="relative z-10 flex gap-4 p-5 align-baseline justify-end">
          <button className='p-2 text-white text-xs font-regular px-8 border rounded-full border-white hover:bg-orange-700 hover:border-none'>
            <a href='#'>
              Sou Cliente
            </a>
          </button>
          <button className='p-2 bg-orange-600 font-bold text-white text-xs font-regular px-8 rounded-full border-white'>
              Sou Colaborador
          </button>
        </div>
      </div>

      {/* Lado direito - Formulário de login */}
      <div className='p-5 w-1/2 justify-center items-center flex flex-col gap-6'>
        <img src='/src/imgs/Glamsync.png' width="256px"></img>
        <input type='name' placeholder='Usuário' className='p-3 rounded-md border border-black bg-transparent'/>
        <input type='password' placeholder='Senha' className='p-3 rounded-md border border-black bg-transparent' />
        <Link to='/Dashboard'>
          <button className='bg-orange-600 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded-lg'>
            Entrar
          </button>
        </Link>
        <a href='#' className='font-semibold text-orange-600 text-xs text-right underline' >Esqueceu a senha?</a>
      </div>
    </div>
  )
}

export default Login