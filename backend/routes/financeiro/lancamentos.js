const express = require('express');
const router = express.Router();
const pool = require('../../bd/bd');

// GET todos os lancamentos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM lancamentos_financeiros');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar lancamentos' });
  }
});

// POST criar um lancamento
router.post('/', async (req, res) => {
  const {conta_financeira_id, tipo_lancamento_id, valor, descricao, meio_pagamento_id} = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO lancamentos_financeiros (conta_financeira_id, tipo_lancamento_id, valor, descricao, meio_pagamento_id) VALUES (?, ?, ?, ?, ?)',
      [conta_financeira_id, tipo_lancamento_id, valor, descricao, meio_pagamento_id]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar lançamentos' });
  }
});

module.exports = router;
