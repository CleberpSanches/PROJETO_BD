const express = require('express');
const router = express.Router();
const pool = require('../../bd/bd');

// GET todos colaboradores
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM colaboradores');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar colaborador' });
  }
});
//criar 

router.post('/', async (req, res) => {
  try {
    let {
      nome,
      cpf,
      email,
      telefone,
      cargo,
      departamento,
      salario_base,
      status
    } = req.body;

    cpf = cpf.replace(/[.\-]/g, '');

    console.log('CPF limpo:', cpf);

    await pool.query(
      `INSERT INTO colaboradores 
       (nome, cpf, email, telefone, cargo, departamento, salario_base, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nome, cpf, email, telefone, cargo, departamento, salario_base, status]
    );

    res.json({ success: true, message: 'Colaborador inserido com sucesso!' });
  } catch (error) {
    console.error('Erro ao inserir colaborador:', error);
    res.status(500).json({ error: 'Erro ao inserir colaborador.' });
  }
});

router.get('/quantidade', async (req, res) => {
  try {
      const [rows] = await pool.query('SELECT COUNT(*) AS total FROM colaboradores');
      res.json({ total: rows[0].total });
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Erro ao buscar quantidade' });
  }
});



module.exports = router;