module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("usermasukan", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nama: {
            type: Sequelize.STRING,
            allowNull: true
        },
        saran: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
    return User;
};