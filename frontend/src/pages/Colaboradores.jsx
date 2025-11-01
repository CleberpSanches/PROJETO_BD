import { useState, useEffect } from 'react';
import InputMask from "react-input-mask";
import Navbar from '../components/Navbar'
import { Toaster, toast } from 'react-hot-toast';

const Agendamentos = () => {
  // select do status
  const [isOpen, setIsOpen] = useState(false);

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // popup - salvar colaborador
  const handleRegister = (e) => {
  e.preventDefault();
  toast.success("Colaborador registrado com sucesso!");
  setIsModalOpen(false);
};

  return (
    <div className='w-screen flex h-screen overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-orange-600'>
      <Navbar />

      <Toaster position="top-center" />

      <main className='p-6 w-screen h-full'>
          <h2 className='font-bold mb-4'>Colaboradores</h2>

          {/* INFORMAÇÕES DOS COLABORADORES */}
          <section id='dashboard status' className='flex gap-4 text-gray-100 mb-4 justify-between'>
            {/* Total de Colaboradores */}
            <div id='status de colaboradores' >
              <div className='flex gap-4 bg-gray-950 p-3 text-sm rounded-md items-center'>
                <i class="bi bi-people text-4xl"></i>
                <div>
                  <p className='font-medium text-md'>Total de Colaboradores</p>
                  {/* Output ▼ | Use os dados do classname pliss pra a formatação ficar igual*/}
                  <p className='text-xs'>50</p>
                </div>
              </div>
            </div>

            {/* Colaboradores novos do mês (nesse mês quantos foram contratados) */}
            <div id='status de colaboradores' >
              <div className='flex gap-4 bg-gray-950 p-3 text-sm rounded-md justify-center'>
                <i class="bi bi-person-add text-4xl"></i>
                <div>
                  <p className='font-medium text-md'>Colaboradores Contratados</p>
                  {/* Output ▼ | Use os dados do classname pliss pra a formatação ficar igual*/}
                  <p className='text-xs'>25</p>
                </div>
              </div>
            </div>

            {/* Candidatos em Análise */}
            <div id='status de colaboradores' >
              <div className='flex gap-4 bg-orange-100 p-3 text-sm rounded-md items-center border border-orange-300'>
                <i class="bi bi-bar-chart-line text-4xl text-orange-600"></i>
                <div className='text-orange-600'>
                  <p className='font-medium text-md'>Candidatos em Análise</p>
                  {/* Output ▼ | Use os dados do classname pliss pra a formatação ficar igual*/}
                  <p className='text-xs'>10</p>
                </div>
              </div>
            </div>
          </section>

          {/* PESQUISA DE ADIÇÃO DE COLABORADOR */}
          <section id='filters' className='flex justify-between mb-2'>
            <div id='pesquisa' className='flex gap-2'>
              {/* procurar nome do colaborador */}
                <div id='search' className='flex font-light p-2 text-xs rounded-md border border-gray-500 text-gray-400 gap-3 items-center'>
                <i class="bi bi-search text-gray-700 text-bold"></i>
                <input 
                  type='name'
                  placeholder='Nome do Colaboroador'
                  className='bg-transparent focus:outline-none'
                />
              </div>

              {/* adicionar status */}
              <select id='search' 
              onClick={() => setIsOpen(!isOpen)}
              className='flex justify-between bg-transparent font-light p-2 text-xs rounded-md border border-gray-500 text-gray-600 focus:outline-none'>
                    <option>Contratado</option>
                    <option>Em análise</option>
                    <option>Demitido</option>
              </select>
            
              {/* botão de pesquisa */}
              <button className='w-10 h-10 bg-orange-600 rounded-md hover:bg-orange-700'>
                    <i class="bi bi-search text-sm text-gray-100 text-bold"></i>
              </button>
            </div>
            
            {/* adicionar colaborador */}
            <button 
            onClick={() => setIsModalOpen(true)}
            className='bg-orange-600 flex gap-2 text-gray-50 p-2 rounded-md hover:bg-orange-700'>
              <i class="bi bi-plus-circle"></i>
              Adicionar Colaborador
            </button>

            {/* modal (adição de colaborador) */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
                <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
                  {/* Botão de fechar */}
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>

                    {/* título */}
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Adicionar Colaborador</h3>

                    {/* dados */}
                    <form className="flex flex-col gap-3" onSubmit={(e) => {
                      e.preventDefault();
                      console.log("Salvar colaborador");
                      handleRegister(e);
                    }}>
                      {/* dados pessoais */}
                      <input 
                        type="text" 
                        placeholder="Nome do Colaborador" 
                        className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-orange-600"
                      />
                      <div className='flex gap-2 justify-between'>
                        <InputMask
                          mask="999.999.999-99"
                          placeholder="CPF"
                          className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-orange-600"
                        />

                        <InputMask 
                          mask={"(99)\\99999-9999"}
                          placeholder='Telefone'
                          className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-orange-600"                          
                        />  
                      </div>
                      <input
                        type="email"
                        placeholder="Email"
                        className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-orange-600"
                      />
                     
                      
                      {/* cargo e departamento*/}
                      <div className='flex flex-1 justify-between'>
                        <input 
                          type='text'
                          placeholder='Cargo'
                          className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-orange-600"
                        />
                        <select id='departamento' 
                          onClick={() => setIsOpen(!isOpen)}
                          className=' border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-orange-600 w-40'>
                                <option>Atendimento e Serviços</option>
                                <option>Recepção e Agendamento</option>
                                <option>Financeiro</option>
                                <option>Recursos Humanos</option>
                                <option>Marketing e Design</option>
                                <option>Gestão e Estratégia</option>
                        </select>
                      </div>

                      {/*status e salário*/}
                      <div className='flex gap-4'>
                        <select id='status' 
                          onClick={() => setIsOpen(!isOpen)}
                          className=' border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-orange-600 w-40'>
                                <option>Contratado</option>
                                <option>Em Análise</option>
                                <option>Demitido</option>
                        </select>
                        <input 
                          type='text'
                          placeholder='Salário'
                          className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-orange-600"
                        />
                      </div>

                      <button 
                        type="submit" 
                        className="bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700"
                      >
                        Salvar
                      </button>
                    </form>
                  </div>
                </div>
              )}
          </section>

          {/* FILTROS */}
          <section id='filtros' className='flex gap-2'>
              <button className='w-8 h-8 bg-orange-600 text-gray-50 rounded-md '>
                <i class="bi bi-grid text-lg items-center"></i>
              </button>
              <button className='w-8 h-8 border border-gray-600 text-gray-600 rounded-md'>
                <i class="bi bi-list text-lg"></i>
              </button>
          </section>

          {/* COLABORADORES */}
          <section>
            <div className="grid grid-cols-4 grid-rows-3 gap-4 m-0 p-4 items-center">
              {/* Output */}
              <div className="p-3 bg-transparent border border-gray-600 text-white items-center justify-center align-baseline rounded-md">
                <button>
                  <i class="bi bi-three-dots text-gray-600"></i>
                </button>
                <div className='flex justify-between'>
                  <div className=''>
                    {/* Output */}
                    <p className='text-xs font-semibold text-gray-900'>Kristin Cooper</p>

                    {/* Output */}
                    <p className='text-xs font-light text-gray-600'>028957</p>

                    {/* Output */}
                    <p className='p-1 bg-orange-200 text-orange-600 rounded-md font-normal text-xs'>Administrativo</p>
                  </div>

                  <div className='flex flex-col gap-1'>
                    <button>
                      <i className="bi bi-person-circle w-8 h-8 bg-slate-950 text-white text-xl rounded-full flex items-center justify-center"></i>
                    </button>
                    <button>
                      <i class="bi bi-chat-left-dots w-8 h-8  text-slate-950 border border-slate-950 text-xl rounded-full flex items-center justify-center"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-orange-600 text-white flex items-center justify-center">Exemplo</div>
              <div className="bg-orange-600 text-white flex items-center justify-center">3</div>
              <div className="bg-orange-600 text-white flex items-center justify-center">3</div>
            </div>
          </section>
      </main>
    </div>
  )
}

export default Agendamentos