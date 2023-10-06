require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const { MongoClient, ObjectID } = require('mongodb');
const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;

const app = express();

app.use(express.json());
app.use(cors());

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

const postUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db(DB_NAME);

    // Check if the user with the given email already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      console.log('Unable to fulfill request, user exists');
      res.sendStatus(409); // User already exists
    } else {
      // User doesn't exist, so insert the new user
      const user = { email, password };
      await db.collection('users').insertOne(user);
      res.sendStatus(200); // User created successfully
    }
    client.close();
  } catch (error) {
    console.error(error);
    res.sendStatus(500); // Internal Server Error
  }
};

app.post('/register', (req, res) => {
  postUser(req, res);
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
