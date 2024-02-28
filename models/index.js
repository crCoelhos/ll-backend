'use strict';


const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');

const dotenv = require('dotenv');
dotenv.config({ path: '/.env' });

console.log('teste: ', process.env.TIDB_USER)


const db = {};

const sequelize = new Sequelize({
  dialect: 'mysql',
  username: process.env.TIDB_USER,
  password: process.env.TIDB_PASSWORD,
  host: process.env.TIDB_HOST,
  port: process.env.TIDB_PORT,
  database: process.env.TIDB_DATABASE,
  dialectOptions: {
    useUTC: false,
    ssl: {
      rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true',
    }
  },
  timezone: '-05:00',
});

const modelPaths = [
  path.join(__dirname, 'user.js'),
  path.join(__dirname, 'roles.js'),
  path.join(__dirname, 'lawyer.js'),
  path.join(__dirname, 'expertise.js'),
  path.join(__dirname, 'lawyerExpertise.js'),
  path.join(__dirname, 'notification.js'),
  path.join(__dirname, 'processNumber.js'),
  path.join(__dirname, 'address.js'),
  path.join(__dirname, 'userAddress.js'),
  path.join(__dirname, 'moduleAccess.js'),
  path.join(__dirname, 'userModuleAccess.js'),
  path.join(__dirname, 'userNotification.js'),
  path.join(__dirname, 'workspaceType.js'),
  path.join(__dirname, 'workspace.js'),
  path.join(__dirname, 'appointmentStatus.js'),
  path.join(__dirname, 'appointment.js'),
  path.join(__dirname, 'follower.js'),
  path.join(__dirname, 'dailyWatch.js'),
];


modelPaths.forEach(file => {
  const model = require(file)(sequelize, Sequelize.DataTypes);

  model.init(
    model.rawAttributes,
    {
      sequelize,
      modelName: model.name,
      tableName: model.tableName || model.options.tableName,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      ...model.options,
    }
  );


  db[model.name] = model;
});




Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});





async function syncDatabase() {
  try {
    await sequelize.sync();
    // await sequelize.sync({ alter: true });
    // await sequelize.sync({ alter: true, force: true });
  } catch (error) {
    console.log(error)
  }
}

syncDatabase()


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


