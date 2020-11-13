const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;

const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");


exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            // Removed bcrypt from here. Very dangerous!
            const passwordIsValid =
                req.body.password ===
                user.password;
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!!!"
                });
            }

            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            return res.status(200).send({
                id: user.id,
                username: user.username,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};