const express = require('express');
const router = express.Router();
const pool = require('../bd/bd');

// GET todos os clientes
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

// POST criar um cliente
router.post('/', async (req, res) => {
  const { tipo_pessoa, documento, nome_razao, email, telefone, endereco, status } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO clientes (tipo_pessoa, documento, nome_razao, email, telefone, endereco, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [tipo_pessoa, documento, nome_razao, email, telefone, endereco, status]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
});

module.exports = router;
