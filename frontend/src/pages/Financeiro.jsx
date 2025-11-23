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

  // MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);

  // VALOR
const [valor_base, setSalario] = useState("");

const handleValorOnChange = (e) => {
  const valorDigitado = e.target.value;

  // Extrai somente números
  const somenteNumeros = valorDigitado.replace(/\D/g, "");

  // Atualiza o estado com o valor formatado
  setSalario(formatarParaReal(somenteNumeros));
};


  const formatarParaReal = (valor) => {
  if (!valor) return "";
  const numero = Number(valor.replace(/\D/g, "")) / 100;
  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
};

  return (
    <main className='w-screen flex h-screen overflow-x-hidden'>
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
              <button className='p-2 rounded-md font-semibold bg-orange-600 text-orange-50 hover:bg-orange-700'
                onClick={() => setIsModalOpen(true)}
              >
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

      {/* MODAL */}
      {/* OBS o modal precisa salvar a data pra a formatação ficar igual a das listas */}
      {/* Tem como adicionar um trigger pra pegar a data ao salvar? */}
      {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
              <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
                <div className='flex justify-between mb-2'>
                  <h2>Lançamento Financeiro</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>

                 <input
                    type="text"
                    placeholder="Nome do Lançamento"
                    className="w-full mb-2 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-orange-600"
                  />

                  <div className='flex gap-2 w-full mb-2'>
                    <input
                      type="text"
                      placeholder="Valor"
                      value={valor_base}
                      onChange={handleValorOnChange}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-orange-600"
                    />

                    <select id='categoria'
                      className='border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-orange-600 w-40'>
                      <option>Serviços</option>
                      <option>Materiais</option>
                      <option>Despesas Fixas</option>
                    </select>
                  </div>
                  <button
                     onClick={() => setIsModalOpen(false)}
                    type="submit"
                    className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700"
                  >
                    Salvar
                  </button>
              </div>
            </div>
      )}
    </main>
  )
}

export default Financeiro