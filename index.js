require('dotenv').config();

const cors = require('cors');
const express = require('express');
const routes = require('./routes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('legaliga api running');
});

app.use(routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
