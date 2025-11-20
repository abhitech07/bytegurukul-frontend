const { Sequelize, DataTypes } = require('sequelize');
const config = require(__dirname + '/../config/config.js').development;

// Initialize Sequelize connection
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: config.logging
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import Models
db.User = require('./user')(sequelize, DataTypes);
db.Course = require('./course')(sequelize, DataTypes);
db.Enrollment = require('./enrollment')(sequelize, DataTypes);
db.Application = require('./application')(sequelize, DataTypes); // <--- NEW: Added Application Model


// Define Relationships
db.User.belongsToMany(db.Course, { through: db.Enrollment, foreignKey: 'userId' });
db.Course.belongsToMany(db.User, { through: db.Enrollment, foreignKey: 'courseId' });

db.Enrollment.belongsTo(db.User, { foreignKey: 'userId' });
db.Enrollment.belongsTo(db.Course, { foreignKey: 'courseId' });

module.exports = db;