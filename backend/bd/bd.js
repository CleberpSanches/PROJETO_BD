const mysql = require('mysql2/promise'); // versão com Promises

// Configuração da conexão
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'BD_PROJECT',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;