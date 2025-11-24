import { useState } from 'react';
import Navbar from '../components/Navbar'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const [itens, setItens] = useState([
    {
      id: 1,
      nome: "Evelyn Macedo",
      horario: "9:00 AM",
      procedimento: "Lavagem e Pintura",
      contato: 75999999999
    },
    {
      id: 2,
      nome: "Carlos Fausto",
      horario: "9:00 AM",
      procedimento: "Lavagem e Pintura",
      contato: 75999999999
    },
    {
      id: 3,
      nome: "Carlos Fausto",
      horario: "9:00 AM",
      procedimento: "Lavagem e Pintura",
      contato: 75999999999
    },
    {
      id: 4,
      nome: "Carlos Fausto",
      horario: "9:00 AM",
      procedimento: "Lavagem e Pintura",
      contato: 75999999999
    },
  ]);

  // gráfico
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

  return (
    <div className='w-screen flex h-screen'>
      <Navbar />
      <main className='p-6 w-screen h-full'>
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        <div className='flex justify-center gap-24 mb-3'>
          {/* gráfico 1 */}
            <div>
              <h3 className='font-bold text-xs'>Agendamentos</h3>
              <div className="bg-transparent p-2 rounded-2xl text-xs">
                <LineChart width={250} height={150} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="valor" stroke="#ea580c" strokeWidth={3} />
                </LineChart>
              </div>
            </div>
        {/* gráfico 2 */}
            <div>
              <h3 className='font-bold text-xs'>Faturamento</h3>
              <div className="bg-transparent p-2 rounded-2xl text-xs">
                <LineChart width={250} height={150} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="valor" stroke="#ea580c" strokeWidth={3} />
                </LineChart>
              </div>
            </div>
        </div>

            {/* tabela */}
        <div className="max-h-[40vh] w-full overflow-y-auto rounded-md border">
          <table className="min-w-full bg-orange-50">
            <thead>
              <tr className="bg-orange-100 text-orange-800 border-b">
                <th className="p-3 text-left">Nome</th>
                <th className="p-3 text-left">Horário</th>
                <th className="p-3 text-left">Procedimento</th>
                <th className="p-3 text-left">Contato</th>
              </tr>
            </thead>

            <tbody>
              {itens.map(item => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{item.nome}</td>
                  <td className="p-3">{item.horario}</td>
                  <td className="p-3">{item.procedimento}</td>
                  <td className="p-3">{item.contato}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default Dashboard