const express = require("express");
const router = express.Router();
const passport = require("passport");
const knex = require("knex");
const constants = require("../../config/constants");

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

// @route   GET api/shop/test
// @desc    Tests shop route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Shop Works" }));

// @route   GET api/shop
// @desc    Get current shopping list
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    db.select("*")
      .from("users")
      .then(users => {
        if (users.length) {
          res.json(users);
        } else {
          errors.msg = "There are no items";
          return res.status(404).json(errors);
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
