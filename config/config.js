require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    port: process.env.TIDB_PORT,
    jwtSecret: process.env.JWT_SECRET,
    username: process.env.TIDB_USER,
    password: process.env.TIDB_PASSWORD,
    database: process.env.TIDB_DATABASE,
    host: process.env.TIDB_HOST,
    dialect: 'mysql',
    dialectModule: "mysql2",
    dialectOptions: {
      ssl: {
        ca: './isrgrootx1.pem',
        rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true',
      }
    },
    timezone: '-05:00',
  },
  test: {
    url: process.env.DATABASE_URL,
    port: process.env.TIDB_PORT,
    jwtSecret: process.env.JWT_SECRET,
    username: process.env.TIDB_USER,
    password: process.env.TIDB_PASSWORD,
    database: process.env.TIDB_DATABASE,
    host: process.env.TIDB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        ca: './isrgrootx1.pem',
        rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true',
      }
    },
    timezone: '-05:00',
  },
};

// const dotenv = require('dotenv');
// dotenv.config({path: './config/.env'});


// module.exports = {
//   development: {
//     use_env_variable: 'DATABASE_URL',
//     port: process.env.DB_PORT,
//     jwtSecret: process.env.JWT_SECRET,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//     dialectOptions: {
//       ssl: {
//         rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true',
//       }
//     },
//     timezone: '-05:00',
//   },
// };