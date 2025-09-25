const express = require('express');
const router = express.Router();
const pool = require('../../bd/bd');

// GET todas as contas a receber
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contas_receber');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar contas a receber' });
  }
});

// POST criar uma conta a receber
router.post('/', async (req, res) => {
  const { venda_id, numero, cliente_id, total_bruto, total_liquido, status } = req.body;

  try {
    //mudar o total_ para ter apenas um total geral
    const [result] = await pool.query(
      'INSERT INTO contas_receber (venda_id, numero, cliente_id, total_bruto, total_liquido, status) VALUES (?, ?, ?, ?, ?, ?)',
      [venda_id, numero, cliente_id, total_bruto, total_liquido, status]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar contas a pagar' });
  }
});

module.exports = router;