    module.exports = (sequelize, Sequelize) => {
        const Kuiz = sequelize.define('kuiz', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            quiz: {
                type: Sequelize.STRING
            },
            options: {
                type: Sequelize.JSON
            },
            key: {
                type: Sequelize.STRING
            },
            categoryId: {
                type: Sequelize.INTEGER
            },
            levelId: {
                type: Sequelize.INTEGER
            }
        });
        return Kuiz;
    }   
