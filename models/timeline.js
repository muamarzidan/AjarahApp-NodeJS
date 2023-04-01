module.exports = (sequelize, Sequelize) => {
    const Timeline = sequelize.define("timeline", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tahun: {
            type: Sequelize.STRING,
            allowNull: false
        },
        detail_tahun: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Timeline;
}