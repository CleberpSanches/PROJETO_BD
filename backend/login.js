const express = require('express');
const router = express.Router();
const pool = require('../bd/bd');

// POST criar um cliente
router.post('/login', async (req, res) => {
  const { usuario, senha } = req.body;
  const user = usuario.find(u=> u.usuario && u.senha);

  if(usuario){
    res.json({
        mensagem: "Login realizado com sucesso!"
    })
    }
    else{
        res.json({
        mensagem: "Login nao realizado"
    })
        }
    });

module.exports = router;
