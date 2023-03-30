module.exports = (sequelize, Sequelize) => {
    const Peristiwa = sequelize.define("peristiwa", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        image: {
            type: Sequelize.STRING, //tobe shown in frontend 
            allowNull: false
        },
        kejadian: {
            type: Sequelize.STRING,
            allowNull: false
        },
        deskripsi: {
            type: Sequelize.STRING,
            allowNull: false
        },
        deskripsiOption: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deskripsiOption2: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });
    return Peristiwa;
};