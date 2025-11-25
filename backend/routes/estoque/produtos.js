const express = require('express');
const router = express.Router();
const pool = require('../../bd/bd');

router.get('/', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT id, nome FROM produtos');
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar produto' });
    }
  });

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
  
    const { 
      nome, 
      preco_custo,
    } = req.body;
  
    try {
      await pool.query(
        "UPDATE produtos SET nome = ?, preco_custo = ? WHERE id = ?",
        [nome, preco_custo, id]
      );
  
      res.json({ message: "Produto atualizado com sucesso" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
module.exports = router;