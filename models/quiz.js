module.exports = (sequelize, Sequelize) => {
    const Quiz = sequelize.define("quiz", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quiz: {
            type: Sequelize.STRING,
        },
        a: {
            type: Sequelize.STRING,
        },
        b: {
            type: Sequelize.STRING
        },
        c: {
            type: Sequelize.STRING
        },
        d: {
            type: Sequelize.STRING
        },
        key: {
            type: Sequelize.STRING
        }
    });
    return Quiz;
};