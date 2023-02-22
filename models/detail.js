module.exports = (sequelize, Sequelize) => {
    const Detail = sequelize.define("detail", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        image: {
            type: Sequelize.BLOB('long'),
            allowNull: false
        },
        nama: {
            type: Sequelize.STRING,
            allowNull: false
        },
        pasangan: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tempat_lahir: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tanggal_lahir: {
            type: Sequelize.STRING,
            allowNull: false
        },
        wafat: {
            type: Sequelize.STRING,
            allowNull: false
        },
        deskripsi: {
            type: Sequelize.STRING,
            allowNull: false
        },
        id_tokoh: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return Detail;
};