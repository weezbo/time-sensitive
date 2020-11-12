const db = require("../models");
const TaskLog = db.task_logs;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.task_id || !req.body.user_id || !req.body.start_time || !req.body.end_time) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const task_log = {
        task_id: req.body.task_id,
        user_id: req.body.user_id,
        start_time: req.body.start_time,
        end_time: req.body.end_time
    };

    TaskLog.create(task_log)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the task log."
            });
        });
};

exports.findAll = (req, res) => {
    const user_id = req.query.user_id;
    const condition = user_id ? { user_id: { [Op.eq]: `${user_id}` } } : null;

    TaskLog.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving task logs."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    TaskLog.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};

exports.deleteAll = (req, res) => {

};