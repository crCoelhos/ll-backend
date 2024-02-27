'use strict';


const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

console.log('Config:', config);
console.log('use_env_variable:', config.use_env_variable);


const sequelize = new Sequelize(config.database, config.username, config.password, config);


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


