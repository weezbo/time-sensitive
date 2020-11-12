const db = require("../models");
const Project = db.projects;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

};

exports.findAll = (req, res) => {
    const customer_id = req.query.customer_id;
    const condition = customer_id ? { customer_id: { [Op.eq]: `${customer_id}` } } : null;

    Project.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving projects."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Project.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Project with id=" + id
            });
        });
};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};

exports.deleteAll = (req, res) => {

};