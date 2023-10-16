module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    Appointment.associate = (models) => {
      Appointment.belongsTo(models.User, { foreignKey: 'userId' });
    };
  
    return Appointment;
  };
  