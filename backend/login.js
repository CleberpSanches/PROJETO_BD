const express = require('express');
const router = express.Router();
const pool = require('./bd/bd'); // seu pool do MySQL

router.post('/', async (req, res) => {
  console.log('Body recebido:', req.body);

  const { login, senha } = req.body;

  try {
    if (!login || !senha) {
      return res.status(400).json({ 
        sucesso: false,
        mensagem: 'Usuário e senha são obrigatórios.' 
      });
    }

    const [rows] = await pool.query(
      'SELECT * FROM usuario WHERE login = ? AND senha = ?',
      [login, senha]
    );

    console.log('Resultado da query:', rows);

    if (rows.length > 0) {
      return res.json({ 
        sucesso: true, 
        mensagem: 'Login realizado com sucesso!' 
      });
    } else {
      return res.status(401).json({ 
        sucesso: false,
        mensagem: 'Usuário ou senha incorretos.' 
      });
    }

  } catch (err) {
    console.error('Erro completo no backend:', err);

    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao realizar login.',
      erro: err.message
    });
  }
});

module.exports = router;
