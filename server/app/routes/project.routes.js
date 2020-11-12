module.exports = app => {
    const project = require("../controllers/project.controller.js");

    const router = require("express").Router();


    // Retrieve all Projects
    router.get("/", project.findAll);

    // Retrieve a single Projects with id
    router.get("/:id", project.findOne);

    app.use('/api/projects', router);
};