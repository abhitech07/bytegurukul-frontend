module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('Application', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    university: {
      type: DataTypes.STRING,
    },
    resumeText: {
      type: DataTypes.TEXT, // Allows for longer text
      allowNull: true,
    },
    roleId: {
      type: DataTypes.STRING, // e.g., 'web', 'android'
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending', // Default status is Pending
    }
  });

  return Application;
};