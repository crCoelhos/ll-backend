require('dotenv').config();

const cors = require('cors');
const express = require('express');
const routes = require('./routes');

const db = require('./models');

const app = express();

app.use(cors());
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