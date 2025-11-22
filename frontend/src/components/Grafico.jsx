import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  YAxis,
} from "recharts";

export default function DynamicChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const months = ["Jan","Fev","Mar","Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    
    const today = new Date();
    const currentMonth = today.getMonth();

    const prevMonth = (currentMonth - 1 + 12) % 12;
    const nextMonth = (currentMonth + 1) % 12;

    const generatedData = [
      { name: months[prevMonth], value: Math.floor(Math.random() * 100) },
      { name: months[currentMonth], value: Math.floor(Math.random() * 100) },
      { name: months[nextMonth], value: Math.floor(Math.random() * 100) },
    ];

    setData(generatedData);
  }, []);

  return (
    <div className="p-3 text-xs mx-auto w-full bg-transparent">
      <div className="w-full h-[30vh]">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />.
            <YAxis width={28}/>
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#CB2B10" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
