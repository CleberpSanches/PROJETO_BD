import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const Estoque = () => {
  const [lancamentos] = useState([
    {
      nome: "shampoo - marca tal",
      custo: "",
      descricao: "Pagamento de serviço",
      quantidade: "10",
    },
    {
      nome: "condicionador - marca tal",
      custo: "",
      descricao: "Item em estoque",
      quantidade: "5",
    },
  ]);


  const [produtos, setProdutos] = useState([]);
  const [estoques, setEstoques] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/produtos')
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar Produto:", error);
        toast.error("Erro ao carregar os Produtos!");
      });

    axios.get('http://localhost:3000/estoques/exibir')
      .then((response) => {
        setEstoques(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar Estoque:", error);
        toast.error("Erro ao carregar o estoque!");
      });
  }, []);
  const [produto_id, setProdutosId] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [local, setLocal] = useState('');
  const salvarEstoque = () => {
    console.log({ produto_id, quantidade, local });
    axios.post('http://localhost:3000/estoques', {
      produto_id,
      quantidade,
      local
    })
      .catch(() => toast.error('Erro ao salvar estoque'));
  };



  const listaFormatada = estoques.map((e) => ({
    produto_id: e.produto_id, 
    estoque_id: e.id,
    nome: e.nome_produto,
    custo: e.preco_custo,
    descricao: e.local,
    quantidade: e.quantidade
  }));
  // Divide a lista automaticamente em duas colunas
  const metade = Math.ceil(listaFormatada.length / 2);
  const lista1 = listaFormatada.slice(0, metade);
  const lista2 = listaFormatada.slice(metade);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [itemEditando, setItemEditando] = useState(null);

  const [editNome, setEditNome] = useState("");
  const [editDescricao, setEditDescricao] = useState("");
  const [editCusto, setEditCusto] = useState("");
  const [editQtd, setEditQtd] = useState("");

  const abrirModal = (item) => {
    setItemEditando(item);

    setEditNome(item.nome);
    setEditDescricao(item.descricao);
    setEditCusto(item.custo);
    setEditQtd(item.quantidade);

    setModalOpen(true);
  };

  const fecharModal = () => {
    setModalOpen(false);
    setItemEditando(null);
  };

  const salvarEdicao = async () => {
    try {
      await axios.put(`http://localhost:3000/produtos/${itemEditando.produto_id}`, {
        nome: editNome,
        preco_custo: editCusto
      });
      await axios.put(`http://localhost:3000/estoques/${itemEditando.estoque_id}`, {
        local: editDescricao,
        quantidade: editQtd
      });
      

      toast.success("Item atualizado!");

      // fecha modal
      fecharModal();

      // recarrega o estoque atualizado
      const response = await axios.get("http://localhost:3000/estoques/exibir");
      setEstoques(response.data);

    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar item!");
    }
  };


  // Menu dropdown global
  const [menuOpenItem, setMenuOpenItem] = useState(null);

  // Modal adição de item
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="w-screen flex h-screen overflow-x-hidden">
      <Navbar />

      {/* MODAL DE EDIÇÃO */}
      {modalOpen && itemEditando && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white w-80 p-4 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-3">Editar Item</h2>

            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={editNome}
                onChange={(e) => setEditNome(e.target.value)}
                className="border p-2 rounded text-sm"
              />

              <input
                type="text"
                value={editDescricao}
                onChange={(e) => setEditDescricao(e.target.value)}
                className="border p-2 rounded text-sm"
              />

              <input
                type="number"
                value={editCusto}
                onChange={(e) => setEditCusto(e.target.value)}
                className="border p-2 rounded text-sm"
              />

              <input
                type="number"
                value={editQtd}
                onChange={(e) => setEditQtd(e.target.value)}
                className="border p-2 rounded text-sm"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-3 py-1 bg-gray-400 text-white rounded"
                onClick={fecharModal}
              >
                Cancelar
              </button>

              <button
                className="px-3 py-1 bg-orange-600 text-white rounded"
                onClick={salvarEdicao}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="p-6 w-screen h-full">
        {/* Header */}
        <div className="flex justify-between mb-3">
          <h2 className="font-semibold">Estoque</h2>

          <div className="flex gap-2">
            <div
              id="search"
              className="flex font-light p-2 text-xs rounded-md border border-gray-500 text-gray-400 gap-3 items-center"
            >
              <i className="bi bi-search text-gray-700 text-bold"></i>
              <input
                type="text"
                placeholder="Nome do Item"
                className="bg-transparent focus:outline-none"
              />
            </div>
            <button className="w-10 h-10 bg-orange-600 rounded-md hover:bg-orange-700">
              <i className="bi bi-search text-sm text-gray-100 text-bold"></i>
            </button>
          </div>
        </div>

        {/* Botão de Adicionar item */}
        <button className='p-2 text-xs text-orange-50 font-semibold mb-2 bg-orange-600 rounded-md hover:bg-orange-700'
          onClick={() => setIsModalOpen(true)}
        >
          <i className="bi bi-plus"></i>
          Adicionar Item
        </button>

        {/* MODAL ADICIONAR ITEM */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
              <div className='flex justify-between mb-2'>
                <h2 className='font-semibold'>Adicionar Item</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>

              <select id='Nome'
                value={produto_id}
                onChange={e => setProdutosId(e.target.value)}
                className='border border-gray-300 rounded-md h-9 p-2 text-sm focus:outline-none focus:border-orange-600'>
                <option value="">Selecione um item</option>
                {
                  produtos.map((i) =>
                  (
                    <option key={i.id} value={i.id}>
                      {i.nome}
                    </option>
                  )
                  )
                }
              </select>
              <div className='flex gap-2'>
                <input
                  type="number"
                  placeholder="Quantidade"
                  value={quantidade}
                  onChange={e => setQuantidade(e.target.value)}
                  className="w-full mb-2 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-orange-600"
                />

              </div>
              <input
                type="text"
                placeholder="Local"
                value={local}
                onChange={e => setLocal(e.target.value)}
                className="w-full mb-2 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-orange-600"
              />
              <button
                onClick={salvarEstoque}
                type="submit"
                className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700"
              >
                Salvar
              </button>
            </div>

          </div>
        )}

        {/* Conteúdo */}
        <div className="flex gap-3">
          <div className="flex flex-col w-full gap-3 max-h-[100vh] overflow-y-auto pr-2">
            {lista1.length > 0 ? (
              lista1.map((item, index) => (
                <CardItem
                  key={index}
                  item={item}
                  abrirModal={abrirModal}
                  menuOpenItem={menuOpenItem}
                  setMenuOpenItem={setMenuOpenItem}
                />
              ))
            ) : (
              <p className="text-gray-600">Nenhum lançamento encontrado</p>
            )}
          </div>

          <div className="flex flex-col w-full gap-3 max-h-[100vh] overflow-y-auto pr-2">
            {lista2.length > 0 ? (
              lista2.map((item, index) => (
                <CardItem
                  key={index}
                  item={item}
                  abrirModal={abrirModal}
                  menuOpenItem={menuOpenItem}
                  setMenuOpenItem={setMenuOpenItem}
                />
              ))
            ) : (
              <p className="text-gray-600">Nenhum lançamento encontrado</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};


// COMPONENTE CARD ITEM COMPLETAMENTE CORRIGIDO
const CardItem = ({ item, abrirModal, menuOpenItem, setMenuOpenItem }) => {

  const menuAberto = menuOpenItem === item;

  const excluirItem = () => {
    console.log("Excluir item:", item);
    setMenuOpenItem(null);
  };

  return (
    <div className="relative p-3 bg-transparent border border-gray-600 rounded-md flex justify-between items-center text-gray-900">
      <div>
        <p className="text-sm font-semibold">{item.nome}</p>
        <p className="text-xs text-gray-500">{item.descricao}</p>

        <span className="text-xs px-2 bg-orange-300 text-orange-700 py-1 rounded-md mt-1 inline-block">
          {item.categoria}
        </span>
      </div>

      <div className="flex flex-col items-end gap-1">
        <div className="flex gap-2">

          {/* Botão editar */}
          <button
            className="rounded-full p-1 h-fit w-fit text-orange-600"
            onClick={() => abrirModal(item)}
          >
            <i className="bi bi-pen-fill text-xs"></i>
          </button>

          {/* Botão menu */}
          <button
            className="rounded-full text-gray-600 p-1 h-fit w-fit"
            onClick={() =>
              setMenuOpenItem(menuAberto ? null : item)
            }
          >
            <i className="bi bi-three-dots-vertical text-xs"></i>
          </button>
        </div>

        <p className="text-2xl font-black">{item.quantidade}</p>

        {/* DROPDOWN */}
        {menuAberto && (
          <div className="absolute right-2 top-12 bg-white border border-gray-300 shadow-lg rounded-md z-50 w-32">
            <button
              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:rounded-md"
              onClick={excluirItem}
            >
              Excluir
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


export default Estoque;
