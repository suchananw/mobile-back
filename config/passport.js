const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const knex = require("knex");
const constants = require("./constants");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: constants.DB_USER,
    password: constants.DB_PASS,
    database: constants.DB_NAME
  }
});

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      db.select("*")
        .from("users")
        .where({ id: jwt_payload.id })
        .then(user => {
          if (user.length) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
