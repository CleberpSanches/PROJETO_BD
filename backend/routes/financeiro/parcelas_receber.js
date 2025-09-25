//ver depois a necessidade de ter esse aqui e o parcela a pagar ou só colocar um trigger no bd

const express = require('express');
const router = express.Router();
const pool = require('../../bd/bd');

// GET todas as parcelas a receber
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM parcelas_receber');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar parcelas a receber' });
  }
});

// POST criar uma parcela a receber
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