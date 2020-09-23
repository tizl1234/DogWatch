const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../model/user.model.js")(sequelize, Sequelize);
db.role = require("../model/role.model")(sequelize, Sequelize);

db.role.belongsToMany(db.user, { trough: "user_roles", foreignKey: "roleId", otherKey: "userId"});
db.user.belongsToMany(db.role, { trough: "user_roles", foreignKey: "userId", otherKey: "roleId"});

module.exports = db;