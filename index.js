require('dotenv').config();

const cors = require('cors');
const express = require('express');
const routes = require('./routes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

const corsOptions = {
  origin: 'https://legaliga.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
