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

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM agendamentos');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar agendamentos' });
  }
});

router.get('/detalhes', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        a.id,
        DATE_FORMAT(a.data, '%Y-%m-%d') AS data,
        a.hora,
        a.observacoes,
        c.nome_razao AS cliente_nome,
        c.telefone,
        col.nome AS colaborador_nome,
        s.descricao AS servico_nome
      FROM agendamentos a
      LEFT JOIN clientes c ON a.cliente_id = c.id
      LEFT JOIN colaboradores col ON a.colaboradores_id = col.id
      LEFT JOIN servico s ON a.servico_id = s.id
      ORDER BY a.data, a.hora
    `);

    console.log(rows);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar agendamentos detalhados' });
  }
});

router.get('/detalhes2', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        a.id,
        a.data,
        a.hora,
        c.nome_razao AS cliente_nome,
        c.telefone,
        s.descricao AS servico_nome
      FROM agendamentos a
      LEFT JOIN clientes c ON a.cliente_id = c.id
      LEFT JOIN colaboradores col ON a.colaboradores_id = col.id
      LEFT JOIN servico s ON a.servico_id = s.id
      ORDER BY a.data, a.hora
    `);
    console.log(rows);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar agendamentos detalhados' });
  }
});
module.exports = router;
