const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Rotas
const loginRoutes = require('./login');
app.use('/login', loginRoutes);
const servRoutes = require('./routes/servico/servicos');
app.use('/servicos', servRoutes);
const colabRoutes = require('./routes/RH/colaboradores');
app.use('/colaboradores', colabRoutes);
const agendRoutes = require('./routes/servico/agendamentos');
app.use('/agendamentos', agendRoutes);
const produtosRoutes = require('./routes/estoque/produtos');
app.use('/produtos', produtosRoutes);
const estoqueRoutes = require('./routes/estoque/estoques');
app.use('/estoques', estoqueRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


