import { useState } from 'react';
import Navbar from '../components/Navbar'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import toast, { Toaster } from 'react-hot-toast';

const Agendamentos = () => {
  const [eventos] = useState([
    { title: 'Exemplo', date: '2025-11-07', descricao: 'Bla´bla-bla' },
  ]);

  const [eventoSelecionado, setEventoSelecionado] = useState(null);

  const handleDateClick = (info) => {
    const evento = eventos.find((e) => e.date === info.dateStr);
    if (evento) {
      setEventoSelecionado(evento);
    } else {
      toast('Nenhum agendamento nesta data!', {
        icon: '📅',
        style: {
          borderRadius: '8px',
          background: '#fff',
          color: '#333',
        },
      });
    }
  };

  return (
    <main className='flex w-screen h-screen overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-orange-600'>
      <Navbar />

      <Toaster position="top-center" />

      <div className="p-6 w-screen overflow-hidden">
        <div id='filtros e info'>
          <h2 className='font-bold'>Agendamentos</h2>
          <div className='flex mb-3 mt-3 justify-end font-semibold'>
            <div className='flex gap-2 text-sm'>
              <button className='flex p-2 border border-gray-900 rounded-md gap-2 hover:bg-gray-800 hover:text-orange-50 hover:border-none'>
                <i className="bi bi-clipboard-data"></i>Relatórios
              </button>
              <button className='bg-orange-600 flex gap-2 text-gray-50 p-2 rounded-md hover:bg-orange-700'>
                <i className="bi bi-plus"></i>Novo Agendamento
              </button>
            </div>
          </div>
        </div>

        <div className='h-[70vh] mx-auto'>
          <FullCalendar
            locale={ptBrLocale}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "timeGridDay,dayGridMonth",
            }}
            buttonText={{
              today: 'Hoje',
              month: 'Mês',
              day: 'Dia'
            }}
            height="auto"
            contentHeight="auto"
            fixedWeekCount={false}
            selectable={true}
            dateClick={handleDateClick}
            events={eventos}
          />
        </div>

        {eventoSelecionado && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[350px]">
              <h2 className="text-xl font-bold text-orange-600">{eventoSelecionado.title}</h2>
              <p className="mt-2 text-gray-700">{eventoSelecionado.descricao}</p>
              <p className="text-sm text-gray-500 mt-1">📆 {eventoSelecionado.date}</p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setEventoSelecionado(null)}
                  className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Agendamentos;
