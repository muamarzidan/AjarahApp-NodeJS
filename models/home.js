module.exports = (sequelize, Sequelize) => {
    const Home = sequelize.define("home", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        herotext: {
            type: Sequelize.STRING,
            allowNull: false
        },
        title1: {
            type: Sequelize.STRING,
            allowNull: false
        },
        title2: {
            type: Sequelize.STRING,
            allowNull: false
        },
        title3: {
            type: Sequelize.STRING,
            allowNull: false
        },
        title4: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });
    return Home;
}

