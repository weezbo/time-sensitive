module.exports = (sequelize, Sequelize) => {
    const TaskLog = sequelize.define("task_log", {
        task_id: {
            type: Sequelize.INTEGER
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        start_time: {
            type: Sequelize.STRING
        },
        end_time: {
            type: Sequelize.STRING
        }
    });
    return TaskLog;
};