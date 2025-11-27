module.exports = (sequelize, DataTypes) => {
  const Pyq = sequelize.define('Pyq', {
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subjectCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.STRING, // e.g., "2023-24"
      allowNull: false
    },
    semester: {
      type: DataTypes.STRING, // e.g., "3rd", "4th"
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('Regular', 'Carry Over'),
      defaultValue: 'Regular'
    },
    fileUrl: { // Path to the downloaded PDF
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Pyq;
};