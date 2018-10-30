const express = require("express");
const router = express.Router();
const passport = require("passport");

const data = [
  {
    id: 1,
    name: "pithi",
    img: "https://azure.wgp-cdn.co.uk/app-yourcat/posts/koratmain.jpg?&width=1200&height=600&mode=crop",
    age: "1",
    breed: "Korat",
    gender: "female"
  },
  {
    id: 2,
    name: "mana",
    img: "https://i0.wp.com/www.quiet-corner.com/wp-content/uploads/2016/07/fgn-1.jpg?fit=710%2C472&ssl=1",
    age: "5",
    breed: "Bombay",
    gender: "female"
  },
  {
    id: 3,
    name: "lulu",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsrD9eKyAqOtbwqb5E8dFPD5tPTd-4r4vEIpX4QMXu-DrmmEhTTA",
    age: "1",
    breed: "Siberian",
    gender: "male"
  },
  {
    id: 4,
    name: "manee",
    img: "https://vetstreet.brightspotcdn.com/dims4/default/69fe629/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F86%2F974690a33511e087a80050568d634f%2Ffile%2FSphynx-2-645mk062211.jpg",
    age: "1",
    breed: "Sphynx",
    gender: "male"
  },
  {
    id: 5,
    name: "choojai",
    img: "http://www.malaysiacatclub.com/breeds/korat1.jpg",
    age: "2.5",
    breed: "Korat",
    gender: "female"
  },
  {
    id: 6,
    name: "weera",
    img: "https://i.ytimg.com/vi/YCaGYUIfdy4/maxresdefault.jpg",
    age: "3",
    breed: "Scottish Fold",
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
