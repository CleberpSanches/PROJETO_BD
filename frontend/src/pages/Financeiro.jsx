import { useState } from 'react';
import Navbar from '../components/Navbar'
import Grafico from '../components/Grafico'

const Financeiro = () => {
 const [lancamentos] = useState([
    {
      tipo: "LUCRO",
      descricao: "Pagamento de serviço",
      data: "20/11/2025",
      valor: "350,00",
      categoria: "Serviços"
    },
    {
      tipo: "GASTO",
      descricao: "Compra de materiais",
      data: "18/11/2025",
      valor: "120,90",
      categoria: "Materiais"
    },
    {
      tipo: "GASTO",
      descricao: "Conta de energia",
      data: "15/11/2025",
      valor: "98,20",
      categoria: "Despesas Fixas"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className='flex w-screen h-screen overflow-y-hidden overflow-x-hidden'>
        <Navbar />
        <div className='p-6 w-screen'>
            <div className='flex justify-between mb-4'>
                <h2 className='font-bold mb-2'>Financeiro</h2>
                <div className='flex gap-3'>
                    <button className='text-sm flex gap-2 bg-orange-600 text-orange-50 p-2 rounded-md hover:bg-orange-700'
                        onClick={() => setIsModalOpen(true)}
                    >
                        <i class="bi bi-plus"></i>
                        <p>Adicionar Lançamento</p>
                    </button>
                    <button className='text-sm flex gap-2 bg-transparent text-gray-700 border border-gray-700 p-2 rounded-md hover:bg-gray-700 hover:text-orange-50'
                        //  onClick={}
                    >
                        <i class="bi bi-file-earmark-arrow-down"></i>
                        <p>Extrair Dados</p>
                    </button>
                </div>
            </div>

            {/* modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                        <div className='flex justify-between text-center'>
                            <h2 className="text-lg font-bold mb-4">Extrair Dados</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-600 hover:text-gray-800"
                                >
                                <i className="bi bi-x-circle"></i>
                            </button>
                        </div>
                        
                    </div>
                </div>
            )}


            {/* graficos */}
            <section id='graficos'>
                <div className='flex justify-center gap-6'>
                    <div className='w-full'>
                        <p>Lucros</p>
                        <Grafico />
                        <div>

                        </div>
                    </div>
                    <div className='w-full'>
                        <p>Gastos</p>
                        <Grafico />
                    </div>
                </div>
            </section>

            {/* últimos gastos */}
             {/* LISTA DE LANÇAMENTOS */}
        <section className='h-full max-h-[45vh]'>
          <h3 className='font-semibold mb-3'>Últimos Lançamentos</h3>

          <div className='flex flex-col gap-3 max-h-[45vh] overflow-y-auto pr-2'>
            {lancamentos.length > 0 ? (
              lancamentos.map((item, index) => (
                <div
                  key={index}
                  className="p-2 bg-transparent border border-gray-600 rounded-md flex justify-between items-center text-gray-900"
                >

                  {/* esquerda */}
                  <div>
                    {/* Output */}
                    <p className="text-sm font-semibold">{item.descricao}</p>
                    {/* Output */}
                    <p className="text-xs text-gray-500">{item.data}</p>

                    <span className={`text-xs px-2 py-1 rounded-md mt-1 inline-block
                      ${item.tipo === "LUCRO"
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700"
                      }`}
                    >
                      {item.categoria}
                    </span>
                  </div>

                  {/* direita */}
                  <p className={`text-md font-bold 
                    ${item.tipo === "LUCRO" ? "text-green-500" : "text-red-500"}`}>
                    
                    {/* Output */}
                    {item.tipo === "LUCRO" ? "+" : "-"} R$ {item.valor}
                  </p>

                </div>
              ))
            ) : (
              <p className="text-gray-600">Nenhum lançamento encontrado</p>
            )}
          </div>
        </section>
        </div>
    </main>
  )
}

export default Financeiro