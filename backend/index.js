const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Rotas
const clientesRoutes = require('./routes/clientes');
app.use('/clientes', clientesRoutes);
const lancamentosRoutes = require('./routes/financeiro/lancamentos');
app.use('/lancamentos', lancamentosRoutes);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


