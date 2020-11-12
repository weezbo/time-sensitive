module.exports = app => {
    const task = require("../controllers/task.controller.js");

    const router = require("express").Router();


    // Retrieve all Tasks
    router.get("/", task.findAll);

    // Retrieve a single Tasks with id
    router.get("/:id", task.findOne);

    app.use('/api/tasks', router);
};