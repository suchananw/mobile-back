const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const shop = require("./routes/api/shop");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.set("port", process.env.PORT || 3001);

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/shop", shop);

// app.get('/search/:query', (req, res) => {
//   const { query } = req.params;
//   db.select('*').from('cats').where({
//     breed : query.breed,
//     gender : query.gender,
//     color: query.color
//   }).andWhereBetween(
//     'price',[query.minPrice,query.maxPrice]
//   ).then(selectedCat => {
//     if (selectedCat.length) {
//       res.json(selectedCat)
//     } else {
//       res.status(400).json('Not found')
//     }
//   })
//   .catch(err => res.status(400).json('error getting cat'))
// })

app.listen(3001, () => {
  console.log("app running 3001");
});
