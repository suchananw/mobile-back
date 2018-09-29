const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const jwt = require('jsonwebtoken');
const DB_NAME = require('./database').DB_NAME;
const DB_USER = require('./database').DB_USER;
const DB_PASS = require('./database').DB_PASS;

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : DB_USER,
    password : DB_PASS,
    database : DB_NAME
  }
});

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3001);

//Generate Token using secret from process.env.JWT_SECRET
function generateToken(user) {
  var u = {
   email: user.email,
   username: user.username
  };
  token = jwt.sign(u, 'secret', {
     expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
  return token
}

app.get('/userToken', (req, res) => {
  // check header or url parameters or post parameters for token
  let token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token'
    });
  }
  token = token.replace('Bearer ', '');
  
  let verified = jwt.verify(token, 'secret', (err, user) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Please register Log in using a valid email'
      });
    } else {
      return res.json({
        user : {
          username : user.username,
          email : user.email
        }
      })
    }
  })
  if (verified) {
    db.select('*').from('login')
      .where('email', '=', user.email)
      .then(login => {
        return res.json({
          user: user,
          token : login.token
        })
      })
      .catch(err => res.status(400).json('unable to get token'))
  }
})

app.post('/signin', (req, res) => {
  db.select('email', 'hash').from('login')
    .where('email', '=', req.body.username)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', req.body.username)
          .then(user => {
            let token = generateToken(user[0])
            db('login')
              .where('email', '=', req.body.username)
              .update({
                session : token
              })
            return res.json({
              user: user[0],
              token : token
            })
          })
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        res.status(400).json('wrong credentials')
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
})

app.post('/signup', (req, res) => {
  const { email, username, password, birthday } = req.body;
  const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            username: username,
            birthday: birthday,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(err => res.status(400).json(err))
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('*').from('users').where({id})
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
})

app.listen(3001, ()=> {
  console.log('app running 3001');
})
