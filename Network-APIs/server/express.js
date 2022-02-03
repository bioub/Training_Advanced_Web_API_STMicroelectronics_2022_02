const express = require('express');
const cors = require('cors');

const user = {
  id: 1,
  name: 'Romain Bohdanowicz',
};

const app = express();

app.use(cors());

app.get('/users/:id', (req, res) => {
  res.json(user);
});

app.listen(9000, () => {
  console.log('Server started on port 9000');
});