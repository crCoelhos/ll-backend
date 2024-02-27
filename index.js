const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

const authRoutes = require('./routes/authRoutes');
const routes = require('./routes');

const app = express();

app.use(express.json());

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN);

app.use('/auth', authRoutes);
app.use('/v1', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
