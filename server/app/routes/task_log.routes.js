module.exports = app => {
    const task_log = require("../controllers/task_log.controller.js");

    const router = require("express").Router();

    // Create a new User
    router.post("/", task_log.create);

    // Retrieve all Users
    router.get("/", task_log.findAll);

    // Retrieve a single User with id
    router.get("/:id", task_log.findOne);

    app.use('/api/task_logs', router);
};