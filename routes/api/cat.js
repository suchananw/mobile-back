const express = require("express");
const router = express.Router();
const passport = require("passport");

const data = [
  {
    id: 1,
    name: "pithi",
    img: "https://i.ytimg.com/vi/YCaGYUIfdy4/maxresdefault.jpg",
    age: "1",
    breed: "booboooo",
    gender: "female"
  },
  {
    id: 2,
    name: "mana",
    img: "https://i.ytimg.com/vi/YCaGYUIfdy4/maxresdefault.jpg",
    age: "1",
    breed: "hello",
    gender: "female"
  },
  {
    id: 3,
    name: "lulu",
    img: "https://i.ytimg.com/vi/YCaGYUIfdy4/maxresdefault.jpg",
    age: "1",
    breed: "hello",
    gender: "male"
  },
  {
    id: 4,
    name: "manee",
    img: "https://i.ytimg.com/vi/YCaGYUIfdy4/maxresdefault.jpg",
    age: "1",
    breed: "hello",
    gender: "male"
  }
];

// @route   GET api/cat/test
// @desc    Tests cat route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Cat Works" }));

// @route   GET api/cat
// @desc    Get current cat list
// @access  Private
router.get(
  "/all",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    if (data.length) {
      res.json(data);
    } else {
      errors.msg = "There are no items";
      return res.status(404).json(errors);
    }
  }
);

// @route   GET api/cat/:cat_id
// @desc    Get Cat by cat ID
// @access  Private

router.get(
  "/:cat_id",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const id = parseInt(req.params.cat_id);
    const index = data.findIndex(x => x.id === id);
    if (index != -1) {
      res.json(data[index]);
    } else {
      errors.nocat = "There is no cat for this ID";
      res.status(404).json(errors);
    }
  }
);

module.exports = router;
