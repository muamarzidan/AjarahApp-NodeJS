const dbConfig = require('../config/db');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.DB, 
    dbConfig.USER, 
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAlias: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        },
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize; add .
db.quizs = require('./quiz')(sequelize, Sequelize);
db.details = require('./detail')(sequelize, Sequelize);
// db.tokohs = require('./tokoh')(sequelize, Sequelize);
db.peristiwas = require('./peristiwa')(sequelize, Sequelize);
db.users = require('./user')(sequelize, Sequelize);
db.homes = require('./home')(sequelize, Sequelize);
// db.timelines = require('./timeline')(sequelize, Sequelize);

module.exports = db;