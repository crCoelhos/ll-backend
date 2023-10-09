require('dotenv').config();
const cors = require('cors');
const express = require('express');

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
const routes = require('./routes')


app.use(cors());
app.use(routes);


require('./views/createRegularUserView');


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
