require('dotenv').config();

const cors = require('cors');
const express = require('express');
const routes = require('./routes');

const db = require('./models');

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,

};

app.use(cors(corsOptions));
app.use(express.json());


app.get('/', (req, res) => {
  res.send('legaliga api running');
});

app.use(routes);

const PORT = process.env.PORT;

db.sequelize
  .authenticate()
  .then(() => {
    console.log('successfull connection');
    app.listen(PORT, () => {
      console.log(`api running at ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('connection failed: ', error);
  });