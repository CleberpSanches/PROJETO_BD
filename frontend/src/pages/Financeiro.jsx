import { useState } from 'react';
import Navbar from '../components/Navbar'
import { Toaster, toast } from 'react-hot-toast';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const Financeiro = () => {
  const getMonthName = (date) =>
    date.toLocaleString("pt-BR", { month: "short" }).toUpperCase();

  const now = new Date();

  const month0 = new Date(now.getFullYear(), now.getMonth() - 2, 1); 
  const month1 = new Date(now.getFullYear(), now.getMonth() - 1, 1); 
  const month2 = new Date(now.getFullYear(), now.getMonth(), 1);

  const data = [
    {
      name: getMonthName(month0),
      valor: Math.floor(Math.random() * 100),
    },
    {
      name: getMonthName(month1),
      valor: Math.floor(Math.random() * 100),
    },
    {
      name: getMonthName(month2),
      valor: Math.floor(Math.random() * 100),
    },
  ];

  const [lancamentos] = useState([
    {
      tipo: "GASTO",
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

  return (
    <main className='w-screen flex h-screen overflow-x-hidden overflow-y-auto'>
      <Navbar />
      <Toaster position="top-center" />
      <section className='p-6 w-screen h-full'>

        <section >
          {/* titulo + botões */}
          <div className='flex justify-between mb-2'>
            <h2 className='font-semibold text-lg'>Financeiro</h2>
            <div className='flex gap-2 text-xs'>
              <button className='p-2 rounded-md border border-gray-700 hover:bg-gray-700 hover:text-gray-50'>
                <i class="bi bi-clipboard2-data"></i>
                Relatório
              </button>
              <button className='p-2 rounded-md bg-orange-600 text-orange-50 hover:bg-orange-700'>
                <i class="bi bi-plus"></i>
                Adicionar Lançamento
              </button>
            </div>
          </div>

          {/* gráficos */}
          <div className='flex justify-center gap-32'>
          {/* lucro */}
            <div>
              <h3 className='font-bold text-xs'>Lucros</h3>
              <div className="bg-transparent p-2 rounded-2xl text-xs">
                <LineChart width={250} height={150} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="valor" stroke="#ea580c" strokeWidth={3} />
                </LineChart>
              </div>
            </div>
          {/* gastos */}
            <div>
              <h3 className='font-bold text-xs'>Gastos</h3>
              <div className="bg-transparent p-2 rounded-2xl text-xs">
                <LineChart width={250} height={150} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="valor" stroke="#ea580c" strokeWidth={3} />
                </LineChart>
              </div>
            </div>
          </div>
        </section>

        {/* lista de entradas e saídas */}
        <section >
          <h3 className='font-semibold mb-3'>Últimos Lançamentos</h3>

          <div className='flex flex-col gap-3 max-h-[35vh] overflow-y-auto pr-2'>
            {lancamentos.length > 0 ? (
              lancamentos.map((item, index) => (
                <div
                  key={index}
                  className="p-3 bg-transparent border border-gray-600 rounded-md flex justify-between items-center text-gray-900"
                >
                  {/* esquerda */}
                  <div>
                    <p className="text-sm font-semibold">{item.descricao}</p>
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
                    {item.tipo === "LUCRO" ? "+" : "-"} R$ {item.valor}
                  </p>

                </div>
              ))
            ) : (
              <p className="text-gray-600">Nenhum lançamento encontrado</p>
            )}
          </div>
        </section>
      </section>
    </main>
  )
}

export default Financeiro