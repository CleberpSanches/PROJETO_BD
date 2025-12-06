const express = require('express');
const router = express.Router();
const pool = require('../../bd/bd');

// GET todos os fornecedores
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM fornecedores");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar fornecedores' });
  }
});

router.post('/', async (req, res) => {
  const {nome_razao, documento, email, telefone, endereco} = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO fornecedores (nome_razao, documento, email, telefone, endereco) VALUES (?, ?, ?, ?, ?)',
      [nome_razao, documento, email, telefone, endereco]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar fornecedor' });
  }
})


module.exports = router;