    module.exports = (sequelize, Sequelize) => {
        const Tokoh = sequelize.define("tokoh", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            image: {
                type: Sequelize.STRING, //to be shown in frontend
                allowNull: false
            },
            nama: {
                type: Sequelize.STRING,
                allowNull: false
            }
        });
        return Tokoh;
    };