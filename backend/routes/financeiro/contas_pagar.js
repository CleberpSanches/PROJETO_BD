//botar no bd um trigger para quando uma compra ser feita criar um contas a pagar

const express = require('express');
const router = express.Router();
const pool = require('../../bd/bd');

// GET todas as contas a pagar
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contas_pagar');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar contas a pagar' });
  }
});

// POST criar uma conta a pagar
router.post('/', async (req, res) => {
  const { compra_id, numero, fornecedor_id, total_bruto, total_liquido, status } = req.body;

  try {
    //mudar o total_ para ter apenas um total geral
    const [result] = await pool.query(
      'INSERT INTO compras (compra_id, numero, fornecedor_id, total_bruto, total_liquido, status) VALUES (?, ?, ?, ?, ?, ?)',
      [compra_id, numero, fornecedor_id, total_bruto, total_liquido, status]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar contas_pagar' });
  }
});

module.exports = router;