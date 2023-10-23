module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateStart: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    dateEnd: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    startingTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endingTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      allowNull: false
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
