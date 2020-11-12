module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("project", {
        name: {
            type: Sequelize.STRING
        },
        customer_id: {
            type: Sequelize.INTEGER
        }
    });
    return Project;
};