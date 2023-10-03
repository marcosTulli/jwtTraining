require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.post('/register', (req, res) => {
  res.send('HI');
  console.log(req.body);
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
