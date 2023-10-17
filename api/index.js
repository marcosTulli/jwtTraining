require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const { MongoClient, ObjectID } = require('mongodb');
const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;
const jwt = require('jwt-simple');

const secret = 'secret';
const app = express();

app.use(express.json());
app.use(cors());

const tokenProvider = (req, res, user) => {
  const payload = {
    iss: req.hostname,
    sub: req.body.email,
  };
  const token = jwt.encode(payload, secret);
  res.status(200).send({
    user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email },
    token: token,
  });
};

const hash = async (string) => {
  return new Promise((res, rej) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return rej(err);
      }
      bcrypt.hash(string, salt, null, (err, hash) => {
        if (err) {
          return rej(err);
        }
        res(hash);
      });
    });
  });
};

const drop = () => {
  (async function addUser() {
    let client;
    try {
      client = await MongoClient.connect(MONGO_URL);
      const db = client.db(DB_NAME);
      await db.collection('users').deleteMany();
    } catch (error) {
      console.log(error);
    }
    client.close();
  })();
};

const getSeminars = async (req, res) => {
  console.log('Serving /semianrs');
  try {
    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db('globomantics');
    const seminars = await db.collection('sessions').find().limit(10).toArray();
    res.status(200).send(seminars);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const createUser = async (req, res) => {
  req.body.password = await hash(req.body.password);
  const { firstName, lastName, email, password } = req.body;
  try {
    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db(DB_NAME);
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      console.log('Unable to fulfill request, user exists');
      res.sendStatus(409);
    } else {
      const user = { firstName, lastName, email, password };
      await db.collection('users').insertOne(user);
      tokenProvider(req, res, user);
    }
    client.close();
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const login = async (req, res) => {
  try {
    const reqUser = req.body;
    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db(DB_NAME);
    const foundUser = await db.collection('users').findOne({ email: reqUser.email });
    if (foundUser) {
      bcrypt.compare(reqUser.password, foundUser.password, (err, isMatch) => {
        if (err) {
          res.status(500).send({ message: 'Server error' });
          console.log(err);
          return;
        }
        if (isMatch) {
          tokenProvider(req, res, foundUser);
        } else {
          res.status(401).send({ message: 'Username or password incorrect' });
        }
      });
    } else {
      res.status(401).send({ message: 'Username or password incorrect' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  }
};

app.post('/register', (req, res) => {
  createUser(req, res);
});

app.post('/login', (req, res) => {
  login(req, res);
});

app.delete('/', (req, res) => {
  console.log('Dropping DB');
  drop();
  res.send(200);
});

app.get('/seminars', (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'You are not authorized' });
  } else {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.decode(token, secret);
    if (!payload.sub) {
      res.status(401).send({ message: 'Authentication failed' });
    }

    getSeminars(req, res);
  }
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
