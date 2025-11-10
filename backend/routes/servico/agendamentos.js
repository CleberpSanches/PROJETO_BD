const express = require('express');
const router = express.Router();
const pool = require('../../bd/bd');

router.post('/', async (req, res) => {
  const { cliente_id, observacoes, servico_id, colaboradores_id, data, hora } = req.body;
  try {
    const [result] = await pool.query(`
      INSERT INTO agendamentos (cliente_id, observacoes, servico_id, colaboradores_id, data, hora)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [cliente_id, observacoes, servico_id, colaboradores_id, data, hora]);
    res.json({ message: 'Agendamento criado com sucesso!', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar agendamento' });
  }
});

module.exports = router;
