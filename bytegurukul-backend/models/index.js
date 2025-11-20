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

// Import Models (will be defined next)
db.User = require('./user')(sequelize, DataTypes);
db.Course = require('./course')(sequelize, DataTypes);
db.Enrollment = require('./enrollment')(sequelize, DataTypes);


// Define Relationships
// A User can enroll in many Courses (through Enrollment)
db.User.belongsToMany(db.Course, { through: db.Enrollment, foreignKey: 'userId' });
db.Course.belongsToMany(db.User, { through: db.Enrollment, foreignKey: 'courseId' });

// Enrollment belongs to User and Course
db.Enrollment.belongsTo(db.User, { foreignKey: 'userId' });
db.Enrollment.belongsTo(db.Course, { foreignKey: 'courseId' });


module.exports = db;