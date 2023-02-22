module.exports = (sequelize, Sequelize) => {
    const Peristiwa = sequelize.define("persitiwa", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        image: {
            type: Sequelize.BLOB('long'),
            allowNull: false
        },
        kejadian: {
            type: Sequelize.STRING,
            allowNull: false
        },
        deskripsi: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Peristiwa;
};