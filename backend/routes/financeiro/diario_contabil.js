const express = require('express');
const router = express.Router();
const pool = require('../../bd/bd');

// GET todas os diario contabil
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM diario_contabil');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar diario contabil' });
  }
});

// POST criar uma conta a receber
router.post('/', async (req, res) => {
  const { codigo, descricao, periodo, criado_por, created_at } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO diario_contabil (codigo, descricao, periodo, criado_por, created_at) VALUES (?, ?, ?, ?, ?)',
      [codigo, descricao, periodo, criado_por, created_at]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar diario contabil' });
  }
});

module.exports = router;