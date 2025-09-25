const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Rotas

//Financeiro
const clientesRoutes = require('./routes/clientes');
app.use('/clientes', clientesRoutes);
const lancamentosRoutes = require('./routes/financeiro/lancamentos');
app.use('/lancamentos', lancamentosRoutes);
const comprasRoutes = require('./routes/financeiro/compras');
app.use('/compras', comprasRoutes);
const contas_financeirasRoutes = require('./routes/financeiro/contas_financeiras');
app.use('/contas_financeiras', contas_financeirasRoutes);
const contas_pagarRoutes = require('./routes/financeiro/contas_pagar');
app.use('/contas_pagar', contas_pagarRoutes);
const contas_receberRoutes = require('./routes/financeiro/contas_receber');
app.use('/contas_receber', contas_receberRoutes);
const diario_contabilRoutes = require('./routes/financeiro/diario_contabil');
app.use('/diario_contabil', diario_contabilRoutes);
const meios_pagamentoRoutes = require('./routes/financeiro/meios_pagamento');
app.use('/meios_pagamento', meios_pagamentoRoutes);
const notas_fiscaisRoutes = require('./routes/financeiro/notas_fiscais');
app.use('/notas_fiscais', notas_fiscaisRoutes);
const pagamentosRoutes = require('./routes/financeiro/pagamentos');
app.use('/pagamentos', pagamentosRoutes);
const parcelas_pagarRoutes = require('./routes/financeiro/parcelas_pagar');
app.use('/parcelas_pagar', parcelas_pagarRoutes);
const parcelas_receberRoutes = require('./routes/financeiro/parcelas_receber');
app.use('/parcelas_receber', parcelas_receberRoutes);
const vendasRoutes = require('./routes/financeiro/vendas');
app.use('/vendas', vendasRoutes);



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


