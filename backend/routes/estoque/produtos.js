const express = require('express');
const router = express.Router();
const pool = require('../../bd/bd');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM produtos');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
});

router.post('/', async (req, res) => {
  const { nome,
    descricao,
    preco_custo,
    preco_venda,
    fornecedor_id } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO produtos (nome,descricao,preco_custo,preco_venda,fornecedor_id) VALUES (?, ?, ?, ?, ?)',
      [nome,descricao, preco_custo, preco_venda, fornecedor_id]
      );
res.json({ id: result.insertId });
    } catch (err) {
  console.error(err);
  res.status(500).json({ error: 'Erro ao criar produto' });
}
  });

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const {
    nome,
    preco_venda,
    preco_custo
  } = req.body;

  try {
    await pool.query(
      "UPDATE produtos SET nome = ?, preco_venda = ?, preco_custo = ? WHERE id = ?",
      [nome, preco_venda, preco_custo, id]
    );

    res.json({ message: "Produto atualizado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;