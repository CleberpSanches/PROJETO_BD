const express = require('express');
const router = express.Router();
const pool = require('./bd/bd'); // seu pool do MySQL

router.post('/', async (req, res) => {
  console.log('Body recebido:', req.body); // MOSTRAR o body recebido

  const { login, senha } = req.body;

  try {
    if (!login || !senha) {
      return res.status(400).json({ mensagem: 'Usuário e senha são obrigatórios.' });
    }

    // Teste simples da conexão com o banco
    const [teste] = await pool.query('SELECT 1 + 1 AS resultado');
    console.log('Teste conexão BD:', teste);

    // Query real
    const [rows] = await pool.query(
      'SELECT * FROM usuario WHERE login = ? AND senha = ?',
      [login, senha]
    );
    console.log('Resultado da query:', rows);

    if (resposta.data.mensagem === 'Login realizado') {
      navigate('/dashboard');
    }

    if (rows.length > 0) {
      res.json({ mensagem: 'Login realizado' });
    } else {
      res.status(401).json({ mensagem: 'Usuário ou senha incorretos.' });
    }
  } catch (err) {
    console.error('Erro completo no backend:', err); // MOSTRAR ERRO COMPLETO
    res.status(500).json({
      mensagem: 'Erro ao realizar login.',
      erro: err.message
    });
  }
});

module.exports = router;  import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [login, setarlogin] = useState('');
  const [senha, setarsenha] = useState('');
  const [mensagem, setMensagem] = useState(''); // ✅ estado para feedback
  const navigate = useNavigate();
  

  const loginReq = async () => {
    try {
      const resposta = await axios.post('http://localhost:3000/login', {
        login,
        senha
      });

      // ✅ mostra mensagem de sucesso
      setMensagem(resposta.data.mensagem);
      console.log(resposta.data);

      if (resposta.data.sucesso) {
        navigate('/dashboard');
      }

    } catch (erro) {
      console.error('Erro ao fazer login:', erro);
      if (erro.response && erro.response.data) {
        setMensagem(erro.response.data.mensagem);
      } else {
        setMensagem('Erro ao conectar com o servidor.');
      }
    }
  };

  return (
    <div className='flex min-h-screen bg-orange-50'>
      {/* Lado esquerdo - Imagem */}
      <div 
        className="w-1/2 min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/src/imgs/signimg.png')" }}
      >
      </div>

      {/* Lado direito - Login */}
      <div className='p-5 w-1/2 justify-center items-center flex flex-col gap-6'>
        <img src='/src/imgs/Glamsync.png' width="256px" alt="Logo" />
        
        <input 
          type='text'
          placeholder='Usuário'
          className='p-3 rounded-md border border-black bg-transparent'
          value={login}
          onChange={(e) => setarlogin(e.target.value)}
        />

        <input 
          type='password'
          placeholder='Senha'
          className='p-3 rounded-md border border-black bg-transparent'
          value={senha}
          onChange={(e) => setarsenha(e.target.value)}
        />

        <button 
          onClick={loginReq} 
          className='bg-orange-600 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded-lg'
        >
          Entrar
        </button>

        {mensagem && (
          <p className='text-sm font-semibold mt-2 text-center text-gray-700'>
            {mensagem}
          </p>
        )}

        <a href='#' className='font-semibold text-orange-600 text-xs text-right underline'>
          Esqueceu a senha?
        </a>
      </div>
    </div>
  );
};

export default Login;