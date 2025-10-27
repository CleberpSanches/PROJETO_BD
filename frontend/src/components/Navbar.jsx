import { Link, useLocation } from 'react-router-dom'

export function Navbar() {
  const location = useLocation()

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">MeuSistema</span>
          </Link>

          {/* Links de Navegação */}
          <div className="flex space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition duration-300 ${
                location.pathname === '/' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/sobre" 
              className={`font-medium transition duration-300 ${
                location.pathname === '/sobre' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              Sobre
            </Link>
            <Link 
              to="/contato" 
              className={`font-medium transition duration-300 ${
                location.pathname === '/contato' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              Contato
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
