
const dotenv = require('dotenv');
dotenv.config({path: './config/.env'});


module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    port: process.env.DB_PORT,
    jwtSecret: process.env.JWT_SECRET,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      useUTC: false, 
      ssl: {
        rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true',
      }
    },
    timezone: '-05:00',
  },
};