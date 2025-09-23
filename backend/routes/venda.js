const express = require('express');
const router = express.Router();
const pool = require('../bd/bd');

// GET todas as vendas
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM vendas');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar vendas' });
  }
});

// POST criar uma venda
router.post('/', async (req, res) => {
  const { codigo_venda, cliente_id, data_venda, total_bruto, total_liquido, status } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO clientes (codigo_venda, cliente_id, data_venda, total_bruto, total_liquido, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [codigo_venda, cliente_id, data_venda, total_bruto, total_liquido, status]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar vendas' });
  }
});

module.exports = router;