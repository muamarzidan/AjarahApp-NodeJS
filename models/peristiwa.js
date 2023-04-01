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
            type: Sequelize.TEXT('long'),
            allowNull: false
        },
        deskripsiOption: {
            type: Sequelize.TEXT('long'),
            allowNull: true
        },
        deskripsiOption2: {
            type: Sequelize.TEXT('long'),
            allowNull: true
        },
    });
    return Peristiwa;
};