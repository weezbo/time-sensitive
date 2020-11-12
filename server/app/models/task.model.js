module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        description: {
            type: Sequelize.STRING
        },
        project_id: {
            type: Sequelize.INTEGER
        }
    });
    return Task;
};