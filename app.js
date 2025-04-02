const express = require('express');
const cors = require('cors');
const app = express();

// Usando o middleware CORS
app.use(cors());

app.get('/api', (req, res) => {
  res.json({ message: 'API funcionando corretamente!' });
});

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
  });
  
