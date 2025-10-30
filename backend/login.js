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

module.exports = router;
