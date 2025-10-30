const express = require('express');
const router = express.Router();
const pool = require('../../bd/bd');

// GET todos os meios de pagamento
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM meios_pagamento');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar meios de pagamento' });
  }
});
module.exports = router;
