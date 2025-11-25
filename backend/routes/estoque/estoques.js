const express = require('express');
const router = express.Router();
const pool = require('../../bd/bd');

router.post('/', async (req, res) => {
    const { produto_id, quantidade, local } = req.body;
    try {
      const [result] = await pool.query(`
       INSERT INTO estoque (produto_id, quantidade, local)
   VALUES (?, ?, ?)
   ON DUPLICATE KEY UPDATE quantidade = quantidade + VALUES(quantidade)
      `, [produto_id, quantidade, local]);
      res.json({ message: 'Estoque criado com sucesso!', id: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao criar agendamento' });
    }
  });

  router.get("/exibir", async (req, res) => {
    try {
      const [rows] = await pool.query(`
        SELECT 
          e.id,
          e.produto_id,
          p.nome AS nome_produto,
          p.preco_custo AS preco_custo,
          e.quantidade,
          e.local
        FROM estoque e
        JOIN produtos p ON p.id = e.produto_id
      `);
  
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
  
    const { 
      local,
      quantidade
    } = req.body;
  
    try {
      await pool.query(
        "UPDATE estoque SET quantidade = ?, local = ? WHERE id = ?",
        [quantidade, local, id]
      );
  
      res.json({ message: "Produto atualizado com sucesso" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  

  module.exports = router;