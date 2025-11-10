const express = require('express');
const router = express.Router();
const pool = require('./bd/bd');

// GET todas as compras
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

// POST criar uma cliente
router.post('/', async (req, res) => {
  const { fornecedor_id, total, status } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO compras (fornecedor_id, total, status) VALUES (?, ?, ?)',
      [fornecedor_id, total, status]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar compra' });
  }
});

module.exports = router;