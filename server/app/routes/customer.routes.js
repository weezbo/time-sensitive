module.exports = app => {
    const customer = require("../controllers/customer.controller.js");

    const router = require("express").Router();


    // Retrieve all Customers
    router.get("/", customer.findAll);

    // Retrieve a single Customers with id
    router.get("/:id", customer.findOne);

    app.use('/api/customers', router);
};