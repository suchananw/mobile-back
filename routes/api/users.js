const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const knex = require("knex");
const constants = require("../../config/constants");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Connect to Postgres
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: constants.DB_USER,
    password: constants.DB_PASS,
    database: constants.DB_NAME
  }
});

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   POST api/users/signup
// @desc    Register user
// @access  Public
router.post("/signup", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  // Find user by email
  db.select("*")
    .from("users")
    .where({ email })
    .then(user => {
      if (user.length) {
        errors.msg = "Email already exists";
        return res.status(400).json(errors);
      }
    });

  const password = req.body.password;
  const username = req.body.username;
  const birthday = req.body.birthday;
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx
      .insert({
        hash: hash,
        email: email
      })
      .into("login")
      .returning("email")
      .then(loginEmail => {
        return trx
          .insert({
            email: loginEmail[0],
            username: username,
            birthday: birthday,
            joined: new Date()
          })
          .into("users")
          .returning("*")
          .then(user => {
            return res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch(err => res.status(400).json("Unable to insert user into Database"));
});

// @route   GET api/users/signin
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/signin", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  db.select("email", "hash")
    .from("login")
    .where({ email })
    .then(data => {
      if (data.length) {
        // Check Password
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid) {
          // User Matched
          const user = db
            .select("*")
            .from("users")
            .where({ email });
          // Create JWT Payload
          const payload = {
            id: user.id,
            username: user.username,
            email: user.email
          };

          // Sign Token
          jwt.sign(payload, "secret", { expiresIn: 3600 }, (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          });
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      } else {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }
    })
    .catch(err => res.status(400).json("wrong credentials"));
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email
    });
  }
);

// @route   GET api/users/all
// @desc    Get all users
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};
  db.select("*")
    .from("users")
    .then(users => {
      if (users.length) {
        res.json(users);
      } else {
        errors.email = "There are no user";
        return res.status(404).json(errors);
      }
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;
