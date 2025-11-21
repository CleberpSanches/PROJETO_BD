const express = require('express');
const router = express.Router();
const pool = require('../../bd/bd');

// GET todos colaboradores
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM ordens_servico');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar OSs' });
  }
});


module.exports = router;