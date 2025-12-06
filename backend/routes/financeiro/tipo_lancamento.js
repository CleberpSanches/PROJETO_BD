const express = require('express');
const router = express.Router();
const pool = require('../../bd/bd');

// GET todos os tipos de lancamento
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tipo_lancamento');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar tipos de lancamento' });
  }
});
module.exports = router;