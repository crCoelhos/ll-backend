'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Appointment extends Model {
    static associate(models) {
      this.belongsTo(models.User,
        {
          foreignKey: 'userId'
        });
      this.belongsTo(models.Workspace,
        {
          foreignKey: 'workspaceId'
        });
      this.belongsTo(models.AppointmentStatus,
        {
          foreignKey: 'appointmentStatusId'
        });
    }
  }

  Appointment.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      isPrivate: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      workspaceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      appointmentStatusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: 'Appointment',
    }
  );

  return Appointment;
};
