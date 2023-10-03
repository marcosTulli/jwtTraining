require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3001;
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/register', (req, res) => {
  console.log(req.body);
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
